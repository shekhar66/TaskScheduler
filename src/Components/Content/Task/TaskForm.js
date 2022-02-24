import { Offcanvas } from "react-bootstrap";
import NewTask from "./NewTask";
import { useDispatch, useSelector } from "react-redux";
import "../../../Assets/TaskForm.css";
import React, { useState } from "react";
import { TopHeader } from "../../NavBar/NavBar";
import Notification from "./Notification";

const TaskForm = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const notification = useSelector((prevState) => {
    return prevState.notification;
  });
  const dispatch = useDispatch();
  const onAddTaskHandler = async (task) => {
    dispatch({ type: "loading", loading: true });
    try {
      const response = await fetch("http://localhost:3002/tasks", {
        method: "POST",
        body: JSON.stringify(task),
        headers: { "Content-Type": "application/json" },
      });
      if (response.status === 201) {
        await response.json();
        dispatch({
          type: "add",
          task: { ...task, duedate: task.substring(0, 10) },
        });
        dispatch({ type: "loading", loading: false });
        dispatch({
          type: "notification",
          notification: { message: "Task has been added sucessfully..!!!" },
        });
        setShow(false);
      }
    } catch (err) {
      dispatch({ type: "loading", loading: false });
      dispatch({
        type: "red",
        notification: { message: "Failed to add Task" },
      });
      setShow(false);
    }
  };
  return (
    <React.Fragment>
      <TopHeader>
        <button className="form-control" onClick={handleShow}>
          +Add New Task
        </button>
        <Offcanvas show={show} onHide={handleClose} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>New Task</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <NewTask addTask={onAddTaskHandler} />
          </Offcanvas.Body>
        </Offcanvas>
      </TopHeader>
      <Notification color={notification.color} message={notification.message} />
    </React.Fragment>
  );
};

export default TaskForm;
