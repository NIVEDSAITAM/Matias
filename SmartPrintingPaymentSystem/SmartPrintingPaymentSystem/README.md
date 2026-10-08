# Smart Printing Payment System

Standalone local prototype based on the supplied UI reference.

## Scope
- Flask + Python backend
- HTML/CSS frontend
- SQLite database
- AES-256-GCM encryption/decryption
- PDF uploads
- Price calculation
- Simulated GCash/payment confirmation
- Student dashboard, upload, settings, summary, tracking
- Admin dashboard, print queue, printer monitoring mockup, history/reports
- ESP32 is intentionally NOT connected in this version

## Run
```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py
```
Open http://127.0.0.1:5000

Admin:
admin@smartprint.local
admin123

The database and AES key are generated locally on first run. Do not commit secret.key or printing.db to a public repository.
