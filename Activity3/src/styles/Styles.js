import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#f5f5f5",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },

  input: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },

  addButton: {
    backgroundColor: "#2196F3",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginLeft: 8,
  },

  addText: {
    color: "white",
    fontWeight: "bold",
  },

  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },

  /* Area that can be tapped */
  completeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  /* Circle / check mark */
  checkBox: {
    fontSize: 45,
    marginRight: 12,
    width: 30,
    textAlign: "center",
  },

  taskText: {
    fontSize: 17,
  },

  /* Completed task */
  completedTask: {
    textDecorationLine: "line-through",
    color: "#888",
  },

  deleteButton: {
    backgroundColor: "#e53935",
    padding: 10,
    borderRadius: 6,
    marginLeft: 10,
  },

  deleteText: {
    color: "white",
    fontWeight: "bold",
  },

  emptyText: {
    textAlign: "center",
    marginTop: 30,
    color: "#777",
    fontSize: 16,
  },

});

export default styles;