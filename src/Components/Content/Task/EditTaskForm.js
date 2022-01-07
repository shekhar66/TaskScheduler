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
    const response = await fetch(
      `https://shekhar-test-dcbe5-default-rtdb.firebaseio.com/tasks/${props.taskid}.json`,
      {
        method: "PATCH",
        body: JSON.stringify({ ...data, id: props.taskid }),
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
