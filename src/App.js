import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Card, Spinner, Accordion } from "react-bootstrap";
import TaskForm from "./Components/TaskForm";
import Header from "./Components/Header";
import TotalTasks from "./Components/TotalTasks";

export const LoadingSpinner = () => {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const request = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://shekhar-test-dcbe5-default-rtdb.firebaseio.com/tasks.json",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();
      const loadedTasks = [];
      for (const taskKey in data) {
        loadedTasks.push({
          id: taskKey,
          title: data[taskKey].title,
          description: data[taskKey].description,
          dueDate: data[taskKey].dueDate,
          type: data[taskKey].type,
        });
      }
      setTasks(loadedTasks);
      setIsLoading(false);
    };
    request();
  }, []);

  const taskDeleteHandler = async (id) => {
    setIsLoading(true);
    await fetch(
      "https://shekhar-test-dcbe5-default-rtdb.firebaseio.com/tasks/" +
        id +
        ".json",
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    setIsLoading(false);
    const allTasks = tasks.filter((task) => id !== task.id);
    setTasks(allTasks);
  };

  const addTaskHandler = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://shekhar-test-dcbe5-default-rtdb.firebaseio.com/tasks.json",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" },
        }
      );
      const resp = await response.json();
      data = { ...data, id: resp.name };
      setTasks((prevTasks) => {
        return [...prevTasks, data];
      });
    } catch (err) {
      alert("Failed");
    }
    setIsLoading(false);
  };

  const updateTaskHandler = async (updatedTask) => {
    setIsLoading(true);
    const id = updatedTask.id;
    delete updatedTask.id;
    await fetch(
      `https://shekhar-test-dcbe5-default-rtdb.firebaseio.com/tasks/${id}.json`,
      {
        method: "PATCH",
        body: JSON.stringify(updatedTask),
        headers: { "Content-Type": "application/json" },
      }
    );
    const latestTask = { ...updatedTask, id };
    const allTasks = [];
    for (const key in tasks) {
      if (tasks[key].id === id) {
        allTasks.push(latestTask);
      } else {
        allTasks.push(tasks[key]);
      }
    }
    setTasks(allTasks);
    setIsLoading(false);
  };

  return (
    <div style={{ width: "50%", left: "25%", marginLeft: "25%" }}>
      {isLoading &&
        ReactDOM.createPortal(
          <LoadingSpinner />,
          document.getElementById("loading_spinner")
        )}
      {isLoading &&
        ReactDOM.createPortal(
          <div className="backdrop-lay"></div>,
          document.getElementById("backdrop")
        )}
      <Card>
        <Card.Body className="add-task-card">
          <Accordion>
            <Accordion.Header className="add-task-header">
              <Header name="Add Task" />
            </Accordion.Header>
            <Accordion.Body>
              <TaskForm onAddTask={addTaskHandler} />
            </Accordion.Body>
          </Accordion>
        </Card.Body>
      </Card>
      <Card style={{ marginTop: "2%" }}>
        <Card.Body>
          <Header name="Total Tasks" />
          <TotalTasks
            onUpdateTask={updateTaskHandler}
            onTaskDelete={taskDeleteHandler}
            tasks={tasks}
            isLoading={isLoading}
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default App;
