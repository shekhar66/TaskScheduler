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
      const response = await fetch(
        "https://shekhar-test-dcbe5-default-rtdb.firebaseio.com/tasks.json",
        {
          method: "POST",
          body: JSON.stringify(task),
          headers: { "Content-Type": "application/json" },
        }
      );
      const resp = await response.json();
      if (resp.name) {
        dispatch({ type: "add", task: { ...task, id: resp.name } });
        dispatch({ type: "loading", loading: false });
        dispatch({
          type: "notification",
          notification: { message: "Task has been added sucessfully..!!!" },
        });
        setShow(false);
      }
    } catch (err) {}
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
