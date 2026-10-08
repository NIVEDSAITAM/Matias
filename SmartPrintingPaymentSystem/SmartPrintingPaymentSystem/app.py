import csv
import io
import os
import sqlite3
import uuid

from functools import wraps

from flask import (
    Response,
    Flask,
    render_template,
    request,
    redirect,
    url_for,
    session,
    flash,
    jsonify
)

from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename

from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from PyPDF2 import PdfReader


# =========================================================
# BASIC SETTINGS
# =========================================================

BASE = os.path.dirname(os.path.abspath(__file__))

DB = os.path.join(BASE, "printing.db")
UPLOADS = os.path.join(BASE, "uploads")
KEY_FILE = os.path.join(BASE, "secret.key")

os.makedirs(UPLOADS, exist_ok=True)


# =========================================================
# FLASK APP
# =========================================================

app = Flask(__name__)

app.secret_key = os.environ.get(
    "FLASK_SECRET_KEY",
    "smart-printing-demo-secret"
)


# =========================================================
# ENCRYPTION KEY
# =========================================================

if os.path.exists(KEY_FILE):
    AES_KEY = open(KEY_FILE, "rb").read()
else:
    AES_KEY = AESGCM.generate_key(bit_length=256)

    with open(KEY_FILE, "wb") as f:
        f.write(AES_KEY)


# =========================================================
# ENCRYPTION / DECRYPTION
# =========================================================

def enc(value):
    """
    Encrypt data using AES-GCM.
    """
    nonce = os.urandom(12)

    data = AESGCM(AES_KEY).encrypt(
        nonce,
        str(value).encode(),
        None
    )

    return (nonce + data).hex()


def dec(value):
    """
    Decrypt AES-GCM encrypted data.
    """
    raw = bytes.fromhex(value)

    return AESGCM(AES_KEY).decrypt(
        raw[:12],
        raw[12:],
        None
    ).decode()


# =========================================================
# DATABASE CONNECTION
# =========================================================

def db():
    c = sqlite3.connect(DB)

    c.row_factory = sqlite3.Row

    return c


def find_user_by_student_id(sid):
    """student_id is stored encrypted with a random nonce, so it cannot be
    searched in SQL. Decrypt and compare instead (fine at prototype scale)."""
    c = db()
    rows = c.execute("SELECT * FROM users WHERE role='student'").fetchall()
    c.close()
    for u in rows:
        try:
            if dec(u["student_id_enc"]).lower() == sid.lower():
                return u
        except Exception:
            continue
    return None


# =========================================================
# CREATE DATABASE TABLES
# =========================================================

def init_db():

    c = db()

    c.executescript("""
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        student_id_enc TEXT NOT NULL UNIQUE,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'student'
    );

    CREATE TABLE IF NOT EXISTS jobs(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        file_enc TEXT NOT NULL,
        pages INTEGER NOT NULL,
        copies INTEGER NOT NULL,
        color TEXT NOT NULL,
        paper TEXT NOT NULL,
        total REAL NOT NULL,
        payment_status TEXT NOT NULL DEFAULT 'PENDING',
        status TEXT NOT NULL DEFAULT 'QUEUED',
        transaction_id TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY(user_id)
        REFERENCES users(id)
    );
    """)

    # Create default admin account
    admin = c.execute(
        "SELECT id FROM users WHERE email='admin@smartprint.local'"
    ).fetchone()

    if not admin:

        c.execute(
            """
            INSERT INTO users(
                name,
                student_id_enc,
                email,
                password,
                role
            )
            VALUES(?,?,?,?,?)
            """,
            (
                "Administrator",
                enc("ADMIN-001"),
                "admin@smartprint.local",
                generate_password_hash("admin123"),
                "admin"
            )
        )

    c.commit()
    c.close()


# =========================================================
# LOGIN REQUIRED
# =========================================================

def home_for_role():
    """Send each role to a page it is actually allowed to open."""
    if session.get("role") == "admin":
        return url_for("admin_dashboard")
    return url_for("dashboard")


def login_required(role=None):

    def deco(fn):

        @wraps(fn)
        def wrapper(*a, **kw):

            if "user_id" not in session:
                return redirect(url_for("login"))

            if role and session.get("role") != role:
                return redirect(home_for_role())

            return fn(*a, **kw)

        return wrapper

    return deco


# =========================================================
# MAKE ACTIVE PAGE AVAILABLE TO HTML
# =========================================================

@app.context_processor
def inject_active():

    return {
        "active": request.endpoint
    }


# =========================================================
# HOME
# =========================================================

@app.route("/")
def home():

    if session.get("user_id"):

        if session.get("role") == "admin":
            return redirect(url_for("admin_dashboard"))

        return redirect(url_for("dashboard"))

    return render_template("login.html")


# =========================================================
# REGISTER
# =========================================================

@app.route("/register", methods=["GET", "POST"])
def register():

    if request.method == "POST":

        name = request.form["name"].strip()
        sid = request.form["student_id"].strip()
        email = request.form["email"].strip().lower()
        password = request.form["password"]

        if not all([name, sid, email, password]):

            flash(
                "Please complete all fields.",
                "error"
            )

        elif find_user_by_student_id(sid):

            flash(
                "Email or Student ID already exists.",
                "error"
            )

        else:

            c = db()

            try:

                c.execute(
                    """
                    INSERT INTO users(
                        name,
                        student_id_enc,
                        email,
                        password
                    )
                    VALUES(?,?,?,?)
                    """,
                    (
                        name,
                        enc(sid),
                        email,
                        generate_password_hash(password)
                    )
                )

                c.commit()

                flash(
                    "Account created. Please login.",
                    "success"
                )

                return redirect(url_for("login"))

            except sqlite3.IntegrityError:

                flash(
                    "Email or Student ID already exists.",
                    "error"
                )

            finally:

                c.close()

    return render_template("register.html")


# =========================================================
# LOGIN
# =========================================================

@app.route("/login", methods=["GET", "POST"])
def login():

    if request.method == "POST":

        email = request.form["email"].strip().lower()
        password = request.form["password"]

        c = db()

        u = c.execute(
            "SELECT * FROM users WHERE email=?",
            (email,)
        ).fetchone()

        c.close()

        if not u and "@" not in email:
            u = find_user_by_student_id(email)

        if u and check_password_hash(
            u["password"],
            password
        ):

            session.update(
                user_id=u["id"],
                role=u["role"],
                name=u["name"]
            )

            if u["role"] == "admin":
                return redirect(url_for("admin_dashboard"))

            return redirect(url_for("dashboard"))

        flash(
            "Invalid email or password.",
            "error"
        )

    return render_template("login.html")


# =========================================================
# LOGOUT
# =========================================================

@app.route("/logout")
def logout():

    session.clear()

    return redirect(url_for("login"))


# =========================================================
# STUDENT DASHBOARD
# =========================================================

@app.route("/dashboard")
@login_required("student")
def dashboard():

    c = db()

    jobs = c.execute(
        """
        SELECT *
        FROM jobs
        WHERE user_id=?
        ORDER BY id DESC
        """,
        (session["user_id"],)
    ).fetchall()

    c.close()

    jobs = [
        dict(
            j,
            file=dec(j["file_enc"])
        )
        for j in jobs
    ]

    return render_template(
        "dashboard.html",
        jobs=jobs
    )


# =========================================================
# STUDENT MY JOBS
# =========================================================

def fetch_student_jobs(condition):
    # `condition` is a fixed SQL string written here, never user input
    c = db()
    rows = c.execute(
        f"SELECT * FROM jobs WHERE user_id=? AND {condition} ORDER BY id DESC",
        (session["user_id"],)
    ).fetchall()
    c.close()
    return [dict(r, file=dec(r["file_enc"])) for r in rows]


@app.route("/jobs")
@login_required("student")
def student_jobs():
    jobs = fetch_student_jobs("status IN ('QUEUED','PRINTING')")
    return render_template("student_jobs.html", jobs=jobs,
                            title="My Jobs", eyebrow="ACTIVE JOBS")


@app.route("/jobs/history")
@login_required("student")
def student_history():
    jobs = fetch_student_jobs("status IN ('COMPLETED','CANCELLED','ERROR')")
    return render_template("student_jobs.html", jobs=jobs,
                           title="Job History", eyebrow="PAST JOBS")


@app.route("/profile")
@login_required("student")
def profile():
    c = db()
    u = c.execute("SELECT * FROM users WHERE id=?",
                  (session["user_id"],)).fetchone()
    c.close()
    return render_template("profile.html", user=u,
                           student_id=dec(u["student_id_enc"]))


# =========================================================
# PRINT / UPLOAD DOCUMENT
# =========================================================

@app.route("/print", methods=["GET", "POST"])
@login_required("student")
def new_print():

    if request.method == "POST":

        f = request.files.get("file")

        if not f or not f.filename.lower().endswith(".pdf"):

            flash(
                "Please upload a PDF document.",
                "error"
            )

            return render_template("print.html")

        filename = secure_filename(f.filename)

        path = os.path.join(
            UPLOADS,
            filename
        )

        f.save(path)

        try:

            pages = len(
                PdfReader(path).pages
            )

        except Exception:

            os.remove(path)

            flash(
                "Invalid PDF file.",
                "error"
            )

            return render_template("print.html")

        try:
            copies = int(request.form.get("copies", 1))
        except ValueError:
            copies = 1

        copies = min(100, max(1, copies))

        color = request.form.get(
            "color",
            "BW"
        )

        paper = request.form.get(
            "paper",
            "A4"
        )

        # ₱2 per page for B&W
        # ₱5 per page for Color

        rate = 5 if color == "COLOR" else 2

        total = pages * copies * rate

        c = db()

        cur = c.execute(
            """
            INSERT INTO jobs(
                user_id,
                file_enc,
                pages,
                copies,
                color,
                paper,
                total
            )
            VALUES(?,?,?,?,?,?,?)
            """,
            (
                session["user_id"],
                enc(filename),
                pages,
                copies,
                color,
                paper,
                total
            )
        )

        jid = cur.lastrowid

        c.commit()
        c.close()

        return redirect(
            url_for(
                "summary",
                job_id=jid
            )
        )

    return render_template("print.html")


# =========================================================
# PRINTING SUMMARY
# =========================================================

@app.route("/job/<int:job_id>")
@login_required()
def summary(job_id):

    c = db()

    j = c.execute(
        "SELECT * FROM jobs WHERE id=?",
        (job_id,)
    ).fetchone()

    c.close()

    if not j:

        return redirect(home_for_role())

    # Students can only view their own jobs
    if (
        session["role"] == "student"
        and j["user_id"] != session["user_id"]
    ):

        return redirect(home_for_role())

    return render_template(
        "summary.html",
        job=dict(
            j,
            file=dec(j["file_enc"])
        )
    )


# =========================================================
# PAYMENT
# =========================================================

@app.route(
    "/job/<int:job_id>/pay",
    methods=["POST"]
)
@login_required()
def pay(job_id):

    c = db()

    j = c.execute(
        "SELECT * FROM jobs WHERE id=?",
        (job_id,)
    ).fetchone()

    if not j:

        c.close()

        return redirect(home_for_role())

    # Students can only pay for their own jobs
    if (
        session["role"] == "student"
        and j["user_id"] != session["user_id"]
    ):

        c.close()

        return redirect(home_for_role())

    if j["payment_status"] == "PAID":

        c.close()

        flash(
            "This job is already paid.",
            "success"
        )

        return redirect(
            url_for(
                "tracking",
                job_id=job_id
            )
        )

    tx = (
        "TXN-"
        + uuid.uuid4().hex[:10].upper()
    )

    c.execute(
        """
        UPDATE jobs
        SET payment_status='PAID',
            status='QUEUED',
            transaction_id=?
        WHERE id=?
        """,
        (
            tx,
            job_id
        )
    )

    c.commit()
    c.close()

    flash(
        "Payment successful. Your print job is now queued.",
        "success"
    )

    return redirect(
        url_for(
            "tracking",
            job_id=job_id
        )
    )


# =========================================================
# PRINT JOB TRACKING
# =========================================================

@app.route("/track/<int:job_id>")
@login_required()
def tracking(job_id):

    c = db()

    j = c.execute(
        "SELECT * FROM jobs WHERE id=?",
        (job_id,)
    ).fetchone()

    c.close()

    if not j:

        return redirect(home_for_role())

    # Students can only track their own jobs
    if (
        session["role"] == "student"
        and j["user_id"] != session["user_id"]
    ):

        return redirect(home_for_role())

    return render_template(
        "tracking.html",
        job=dict(
            j,
            file=dec(j["file_enc"])
        )
    )


# =========================================================
# ADMIN DASHBOARD
# =========================================================

def admin_rows():
    c = db()
    jobs = c.execute(
        """
        SELECT j.*, u.name, u.email, u.student_id_enc
        FROM jobs j
        JOIN users u ON j.user_id = u.id
        ORDER BY j.id DESC
        """
    ).fetchall()
    c.close()

    return [
        dict(
            j,
            student_id=dec(j["student_id_enc"]),
            file=dec(j["file_enc"])
        )
        for j in jobs
    ]


def admin_stats(rows):
    return {
        "prints": len(rows),
        "payments": sum(x["total"] for x in rows if x["payment_status"] == "PAID"),
        "active": sum(x["status"] == "PRINTING" for x in rows),
        "pending": sum(x["status"] == "QUEUED" for x in rows)
    }


def render_admin(view):
    rows = admin_rows()
    return render_template(
        "admin.html",
        jobs=rows,
        stats=admin_stats(rows),
        view=view
    )


@app.route("/admin")
@login_required("admin")
def admin_dashboard():
    return render_admin("dashboard")


@app.route("/admin/queue")
@login_required("admin")
def admin_queue():
    return render_admin("queue")


@app.route("/admin/printers")
@login_required("admin")
def admin_printers():
    return render_admin("printers")


@app.route("/admin/reports")
@login_required("admin")
def admin_reports():
    rows = admin_rows()
    return render_template(
        "history.html",
        jobs=rows,
        stats=admin_stats(rows),
        reports=True
    )


@app.route("/admin/reports/export")
@login_required("admin")
def admin_report_export():
    rows = admin_rows()
    buf = io.StringIO()
    w = csv.writer(buf)
    w.writerow(["Job #", "Date/Time", "Student", "File", "Pages", "Copies",
                "Amount", "Payment", "Status"])
    for j in rows:
        w.writerow([j["id"], j["created_at"], j["name"], j["file"], j["pages"],
                    j["copies"], "%.2f" % j["total"], j["payment_status"], j["status"]])
    return Response(
        "\ufeff" + buf.getvalue(),
        mimetype="text/csv",
        headers={"Content-Disposition": "attachment; filename=print_report.csv"}
    )


@app.route("/admin/notifications")
@login_required("admin")
def admin_notifications():
    notes = []
    for j in admin_rows():
        ref = "#%03d" % j["id"]
        if j["status"] == "ERROR":
            notes.append(("error", "Job %s (%s) hit a printer error." % (ref, j["file"]), j["created_at"]))
        if j["status"] == "QUEUED" and j["payment_status"] == "PAID":
            notes.append(("info", "Job %s from %s is paid and waiting to print." % (ref, j["name"]), j["created_at"]))
        if j["payment_status"] != "PAID" and j["status"] not in ("CANCELLED", "COMPLETED"):
            notes.append(("warn", "Job %s from %s is awaiting payment." % (ref, j["name"]), j["created_at"]))
    return render_template("notifications.html", notes=notes)


# =========================================================
# ADMIN CHANGE PRINT STATUS
# =========================================================

@app.route(
    "/admin/job/<int:job_id>",
    methods=["POST"]
)
@login_required("admin")
def admin_status(job_id):

    status = request.form.get(
        "status"
    )

    allowed_statuses = {
        "QUEUED",
        "PRINTING",
        "COMPLETED",
        "CANCELLED",
        "ERROR"
    }

    if status not in allowed_statuses:

        return redirect(
            request.referrer or url_for("admin_dashboard")
        )

    c = db()

    c.execute(
        """
        UPDATE jobs
        SET status=?
        WHERE id=?
        """,
        (
            status,
            job_id
        )
    )

    c.commit()
    c.close()

    return redirect(
        request.referrer or url_for("admin_dashboard")
    )


# =========================================================
# ADMIN HISTORY
# =========================================================

@app.route("/admin/history")
@login_required("admin")
def history():

    c = db()

    jobs = c.execute(
        """
        SELECT
            j.*,
            u.name,
            u.student_id_enc
        FROM jobs j
        JOIN users u
            ON j.user_id = u.id
        ORDER BY j.id DESC
        """
    ).fetchall()

    c.close()

    rows = [
        dict(
            j,
            student_id=dec(
                j["student_id_enc"]
            ),
            file=dec(
                j["file_enc"]
            )
        )
        for j in jobs
    ]

    return render_template(
        "history.html",
        jobs=rows
    )


# =========================================================
# RUN APPLICATION
# =========================================================

if __name__ == "__main__":

    init_db()

    app.run(
        debug=True
    )