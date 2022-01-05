import { Accordion, Table, Button } from "react-bootstrap";
import "../UI/Tasks.css";
import EditTaskForm from "./EditTaskForm";

const Tasks = (props) => {
  const deleteTaskHandler = (event) => {
    props.onDeleteTask(event.target.id);
  };
  const updateTaskHandler = (updatedTask) => {
    props.onUpdateTask(updatedTask);
  };
  return (
    <Accordion>
      {props.tasks.map((task, index) => {
        return (
          <Accordion.Item eventKey={index} key={index}>
            <Accordion.Header>{task.title}</Accordion.Header>
            <Accordion.Body>
              <div style={{ float: "right" }}>
                <EditTaskForm
                  onUpdateTask={updateTaskHandler}
                  taskid={task.id}
                />
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
};

export default Tasks;
