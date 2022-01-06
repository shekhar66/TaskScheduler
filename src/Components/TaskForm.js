import { Accordion, Card } from "react-bootstrap";
import Header from "./Header";
import NewTask from "./NewTask";
import { useDispatch, useSelector } from "react-redux";
import "../Assets/TaskForm.css";
import Notification from "./Notification";

const TaskForm = (props) => {
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
      }
    } catch (err) {}
  };
  return (
    <Card className="add-task-card">
      <Notification color={notification.color} message={notification.message} />
      <Card.Body className="add-task-card">
        <Accordion>
          <Accordion.Header className="add-task-header">
            <Header name="Add Task" />
          </Accordion.Header>
          <Accordion.Body>
            <NewTask addTask={onAddTaskHandler} />
          </Accordion.Body>
        </Accordion>
      </Card.Body>
    </Card>
  );
};

export default TaskForm;
