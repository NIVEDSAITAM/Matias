import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F7FB",
  },

  header: {
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  greeting: {
    fontSize: 14,
    color: "#777B87",
    marginBottom: 4,
  },

  name: {
    fontSize: 26,
    fontWeight: "700",
    color: "#171A23",
  },

  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#202A44",
    alignItems: "center",
    justifyContent: "center",
  },

  profileText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  balanceCard: {
    marginHorizontal: 20,
    padding: 22,
    borderRadius: 22,
    backgroundColor: "#202A44",
    elevation: 5,
  },

  balanceLabel: {
    color: "#B9C0D1",
    fontSize: 14,
  },

  balanceAmount: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "700",
    marginTop: 8,
  },

  balanceFooter: {
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },

  smallLabel: {
    color: "#9DA6BB",
    fontSize: 12,
    marginBottom: 4,
  },

  income: {
    color: "#72D5A3",
    fontSize: 14,
    fontWeight: "600",
  },

  percentageBox: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: "#31405F",
  },

  percentage: {
    color: "#72D5A3",
    fontWeight: "600",
    fontSize: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#171A23",
    marginLeft: 20,
    marginTop: 26,
    marginBottom: 14,
  },

  actionRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 12,
  },

  actionCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    elevation: 2,
  },

  actionIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },

  blueIcon: {
    backgroundColor: "#E7F0FF",
  },

  purpleIcon: {
    backgroundColor: "#F0E9FF",
  },

  orangeIcon: {
    backgroundColor: "#FFF0DD",
  },

  iconText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#202A44",
  },

  actionText: {
    fontSize: 12,
    color: "#454957",
    fontWeight: "600",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginRight: 20,
  },

  viewText: {
    color: "#68708A",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 25,
  },

  chartCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    borderRadius: 18,
    padding: 18,
    elevation: 2,
  },

  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  chartLabel: {
    color: "#8A8F9C",
    fontSize: 12,
  },

  chartAmount: {
    fontSize: 24,
    fontWeight: "700",
    color: "#171A23",
    marginTop: 4,
  },

  chartChange: {
    color: "#55B989",
    fontWeight: "600",
    fontSize: 12,
  },

  chart: {
    height: 140,
    marginTop: 20,
    position: "relative",
    justifyContent: "flex-end",
  },

  gridLine: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 1,
    backgroundColor: "#EEF0F4",
  },

  barContainer: {
    height: 125,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 4,
  },

  bar: {
    width: 25,
    borderRadius: 7,
    backgroundColor: "#DDE3F0",
  },

  activeBar: {
    backgroundColor: "#202A44",
  },

  days: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },

  day: {
    color: "#9A9EAA",
    fontSize: 10,
  },

  activityCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    borderRadius: 18,
    paddingHorizontal: 16,
    elevation: 2,
  },

  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F1F4",
  },

  activityLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  activityIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: "#F3F4F8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  emoji: {
    fontSize: 20,
  },

  activityTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#292D38",
  },

  activitySubtitle: {
    fontSize: 11,
    color: "#979BA6",
    marginTop: 4,
  },

  activityAmount: {
    fontSize: 13,
    fontWeight: "700",
    color: "#333744",
  },

  positiveAmount: {
    color: "#42A977",
  },

  bottomNav: {
    height: 70,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#ECEEF2",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  navItem: {
    alignItems: "center",
    justifyContent: "center",
  },

  navIcon: {
    fontSize: 20,
    color: "#A1A5B0",
  },

  activeNavIcon: {
    fontSize: 20,
    color: "#202A44",
  },

  navText: {
    fontSize: 10,
    color: "#A1A5B0",
    marginTop: 3,
  },

  activeNavText: {
    fontSize: 10,
    color: "#202A44",
    fontWeight: "700",
    marginTop: 3,
  },
});

export default styles;