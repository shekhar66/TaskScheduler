import React, { useState /* useContext */ } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import TaskForm from "./TaskForm";
import ReactDOM from "react-dom";
import { LoadingSpinner } from "../App";
// import TaskContext from "../Context/task-context";

const EditTaskForm = (props) => {
  // const taskCtx = useContext(TaskContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [isLoading, setIsLoading] = useState(false);
  const [taskDetails, setTaskDetals] = useState({});

  const handleShow = () => {
    console.log(props);
    const request = async () => {
      if (props.taskid) {
        setIsLoading(true);
        const response = await fetch(
          `https://shekhar-test-dcbe5-default-rtdb.firebaseio.com/tasks/${props.taskid}.json`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        setTaskDetals(data);
        setIsLoading(false);
        setShow(true);
      }
    };
    request();
  };

  const addTaskHandler = async (data) => {
    setShow(false);
    props.onUpdateTask({ ...data, id: props.taskid });
    setIsLoading(false);
  };

  return (
    <React.Fragment>
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
      <Button onClick={handleShow}>Edit</Button>{" "}
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Edit Task</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <TaskForm onAddTask={addTaskHandler} taskDetails={taskDetails} />
        </Offcanvas.Body>
      </Offcanvas>
    </React.Fragment>
  );
};

export default EditTaskForm;
