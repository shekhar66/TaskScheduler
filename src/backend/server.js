const express = require("express");
// const localtunnel = require("localtunnel");
const cors = require("cors");
const taskController = require("./controller/taskController");
const userController = require("./controller/userController");

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
app.get("/users", userController.getAllUsers);
app.post("/user/login", userController.userLogin);
app.post("/users", userController.addUser);
app.patch("/users/:id", userController.updateUser);
app.delete("/users/:id", userController.deleteUser);

app.listen(3001, () => {
  console.log(`App is running on port 3001`);
});
// (async () => {
//   const tunnel = await localtunnel({
//     subdomain: "tasks",
//     port: 3001,
//   });
//   console.log(`App available at: ${tunnel.url}`);
// })();
