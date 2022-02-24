import React, { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import NewTask from "./NewTask";
import { useSelector, useDispatch } from "react-redux";

const EditTaskForm = (props) => {
  const editTask = useSelector((prevTasks) =>
    prevTasks.tasks.find((task) => {
      return task.id === props.taskid;
    })
  );
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [taskDetails, setTaskDetals] = useState({});

  const handleShow = () => {
    const request = async () => {
      if (props.taskid) {
        setTaskDetals(editTask);
        setShow(true);
      }
    };
    request();
  };

  const editTaskHandler = async (data) => {
    setShow(false);
    dispatch({ type: "loading", loading: true });
    try {
      const response = await fetch(
        `http://localhost:3002/tasks/${props.taskid}`,
        {
          method: "PATCH",
          body: JSON.stringify({ ...data }),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.ok) {
        dispatch({ type: "edit", task: { ...data, id: props.taskid } });
        dispatch({ type: "loading", loading: false });
        dispatch({
          type: "notification",
          notification: {
            message: "Task has been updated sucessfully..!!!",
            color: "orange",
          },
        });
      } else {
        throw new Error();
      }
    } catch (error) {
      dispatch({ type: "loading", loading: false });
      dispatch({
        type: "notification",
        notification: {
          message: "Failed to update task",
          color: "red",
        },
      });
    }
  };

  return (
    <React.Fragment>
      <Button onClick={handleShow}>Edit</Button>{" "}
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Edit Task</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <NewTask
            addTask={editTaskHandler}
            taskDetails={taskDetails}
            isEditForm={true}
          />
        </Offcanvas.Body>
      </Offcanvas>
    </React.Fragment>
  );
};

export default EditTaskForm;
