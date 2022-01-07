import { Accordion, Table, Button, Card } from "react-bootstrap";
import EditTaskForm from "./EditTaskForm";
import Header from "./Header";
import "../Assets/TotalTasks.css";
import { useDispatch, useSelector } from "react-redux";
import TaskFilter from "./TaskFilter";

const TotalTasks = (props) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((prevState) => {
    return prevState.isLoading;
  });
  let content = (
    <Header
      name={
        isLoading
          ? "Loading....!!!!"
          : "No Tasks Found..!! Try by adding new..!!"
      }
      style={{ color: "darkslateblue" }}
    />
  );

  const deleteTaskHandler = async (event) => {
    dispatch({ type: "loading", loading: true });
    try {
      await fetch(
        "https://shekhar-test-dcbe5-default-rtdb.firebaseio.com/tasks/" +
          event.target.id +
          ".json",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );
      dispatch({ type: "delete", taskId: event.target.id });
      dispatch({ type: "loading", loading: false });
      dispatch({
        type: "notification",
        notification: {
          message: "Task has been deleted sucessfully..!!!",
          color: "red",
        },
      });
    } catch (err) {}
  };
  if (props.tasks.length) {
    content = (
      <Accordion>
        {props.tasks.map((task, index) => {
          return (
            <Accordion.Item eventKey={index} key={index}>
              <Accordion.Header>{task.title}</Accordion.Header>
              <Accordion.Body>
                <div style={{ float: "right" }}>
                  <EditTaskForm taskid={task.id} />
                  <Button id={task.id} onClick={deleteTaskHandler}>
                    Delete
                  </Button>{" "}
                </div>
                <Table>
                  <tbody>
                    <tr>
                      <th>Title</th>
                      <td>{task.title}</td>
                    </tr>
                    <tr>
                      <th>Description</th>
                      <td>{task.description}</td>
                    </tr>
                    <tr>
                      <th>Type</th>
                      <td>{task.type}</td>
                    </tr>
                    <tr>
                      <th>Closure Date</th>
                      <td>{task.dueDate}</td>
                    </tr>
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    );
  }
  return (
    <Card className="total-tasks-card">
      <Card.Body>
        <Header name="Total Tasks" />
        <hr className="hr-tasks"></hr>
        <TaskFilter />
        {content}
      </Card.Body>
    </Card>
  );
};

export default TotalTasks;
