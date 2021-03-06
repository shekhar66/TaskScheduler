import { useReducer } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import "../UI/overwrite.css";
import TaskReducer from "../Reducers/TaskReducer";

const TaskForm = (props) => {
  const initialState = {
    title: props.taskDetails ? props.taskDetails.title : "",
    isTitleValid: true,
    description: props.taskDetails ? props.taskDetails.description : "",
    isDescriptionValid: true,
    dueDate: props.taskDetails ? props.taskDetails.dueDate : "",
    isDueDateValid: true,
    taskType: props.taskDetails ? props.taskDetails.type : "",
    isTypeValid: true,
  };
  const [taskState, dispatchTaskData] = useReducer(TaskReducer, initialState);

  const ValidateInput = (event) => {
    switch (event.target.id) {
      case "task_title":
        dispatchTaskData({
          type: "validateTitle",
          isTitleValid: event.target.value,
        });
        break;
      case "task_description":
        dispatchTaskData({
          type: "validateDescription",
          isDescriptionValid: event.target.value,
        });
        break;
      case "task_due_date":
        dispatchTaskData({
          type: "validateDueDate",
          isDueDateValid: event.target.value,
        });
        break;
      case "task_type":
        dispatchTaskData({
          type: "validateType",
          isTypeValid: event.target.value ? true : false,
        });
        break;
      default:
        break;
    }
  };
  const titleChangeHandler = (event) => {
    dispatchTaskData({ type: "titleInput", title: event.target.value });
    ValidateInput(event);
  };
  const descriptionChangeHandler = (event) => {
    dispatchTaskData({ type: "description", description: event.target.value });
    ValidateInput(event);
  };
  const dueDateChangeHandler = (event) => {
    dispatchTaskData({ type: "dueDateInput", dueDate: event.target.value });
    ValidateInput(event);
  };

  const taskTypeChangeHandler = (event) => {
    dispatchTaskData({ type: "typeInput", taskType: event.target.value });
    ValidateInput(event);
  };

  const addTaskHandler = (event) => {
    event.preventDefault();
    if (
      taskState.title &&
      taskState.description &&
      taskState.dueDate &&
      taskState.taskType
    ) {
      props.onAddTask({
        title: taskState.title,
        description: taskState.description,
        dueDate: taskState.dueDate,
        type: taskState.taskType,
      });
      dispatchTaskData({ type: "titleInput", title: "" });
      dispatchTaskData({
        type: "description",
        description: "",
      });
      dispatchTaskData({ type: "dueDateInput", dueDate: "" });
      dispatchTaskData({ type: "typeInput", taskType: "" });
    }
    if (!taskState.title) {
      dispatchTaskData({ type: "validateTitle", isTitleValid: false });
    }
    if (!taskState.description) {
      dispatchTaskData({
        type: "validateDescription",
        isDescriptionValid: false,
      });
    }
    if (!taskState.dueDate) {
      dispatchTaskData({ type: "validateDueDate", isDuDateValid: false });
    }
    if (!taskState.taskType) {
      dispatchTaskData({ type: "validateType", isTypeValid: false });
    }
  };
  return (
    <form onSubmit={addTaskHandler}>
      <div>
        <label
          className={`form-label ${!taskState.isTitleValid ? "invalid" : ""}`}
          htmlFor="task_title"
        >
          Title
        </label>
        <input
          id="task_title"
          type="text"
          className={`form-control ${!taskState.isTitleValid ? "invalid" : ""}`}
          onChange={titleChangeHandler}
          value={taskState.title}
          placeholder="This field is required..."
        />
      </div>
      <div>
        <label
          className={`form-label ${
            !taskState.isDescriptionValid ? "invalid" : ""
          }`}
          htmlFor="task_description"
        >
          Description
        </label>
        <input
          id="task_description"
          type="textarea"
          className={`form-control ${
            !taskState.isDescriptionValid ? "invalid" : ""
          }`}
          onChange={descriptionChangeHandler}
          value={taskState.description}
          placeholder="This field is required..."
        />
      </div>
      <Container style={{ paddingRight: "0px", paddingLeft: "0px" }}>
        <Row>
          <Col>
            <label
              className={`form-label ${
                !taskState.isDueDateValid ? "invalid" : ""
              }`}
              htmlFor="task_due_date"
            >
              Closure Date
            </label>
            <input
              id="task_due_date"
              type="date"
              className={`form-control ${
                !taskState.isDueDateValid ? "invalid" : ""
              }`}
              onChange={dueDateChangeHandler}
              value={taskState.dueDate}
            />
          </Col>
          <Col>
            <label
              className={`form-label ${
                !taskState.isTypeValid ? "invalid" : ""
              }`}
              htmlFor="task_type"
            >
              Type
            </label>
            <select
              className={`form-control ${
                !taskState.isTypeValid ? "invalid" : ""
              }`}
              id="task_type"
              onChange={taskTypeChangeHandler}
              value={taskState.taskType}
            >
              <option value=""></option>
              <option value="Call">Call</option>
              <option value="Email">Email</option>
              <option value="Meeting">Meeting</option>
            </select>
          </Col>
        </Row>
      </Container>
      <div style={{ marginTop: "10px" }}>
        <Button style={{ float: "right", marginBottom: "8px" }} type="submit">
          Add
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
