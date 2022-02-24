const express = require("express");
// const localtunnel = require("localtunnel");
const cors = require("cors");
const taskController = require("./controller/taskController");

require("./database/db");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/tasks", taskController.getAllTasks);
app.post("/tasks", taskController.addTask);
app.patch("/tasks/:id", taskController.updateTask);
app.delete("/tasks/:id", taskController.deleteTask);

app.listen(3002, () => {
  console.log(`App is running on port 3002`);
});
// (async () => {
//   const tunnel = await localtunnel({
//     subdomain: "tasks",
//     port: 3001,
//   });
//   console.log(`App available at: ${tunnel.url}`);
// })();
