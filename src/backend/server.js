const express = require("express");
const cors = require("cors");
const taskController = require("./controller/taskController");
const userController = require("./controller/userController");
const authorization = require("./middleware/authorization");

require("./database/db");

const app = express();
app.use(express.json());
app.use(cors());

// Task Routes
app.get("/tasks", taskController.getAllTasks);
app.post("/tasks", taskController.addTask);
app.patch("/tasks/:id", taskController.updateTask);
app.delete("/tasks/:id", taskController.deleteTask);

// User Routes
app.get("/users", authorization, userController.getAllUsers);
app.post("/user/login", userController.userLogin);
app.post("/users", userController.addUser);
app.patch("/users/:id", authorization, userController.updateUser);
app.delete("/users/:id", authorization, userController.deleteUser);

app.listen(3001, () => {
  console.log(`App is running on port 3001`);
});
