const TaskReducer = (state, action) => {
  let updatedState = {};
  switch (action.type) {
    case "titleInput":
      updatedState = { ...state, title: action.title };
      break;
    case "validateTitle":
      updatedState = { ...state, isTitleValid: action.isTitleValid };
      break;
    case "description":
      updatedState = { ...state, description: action.description };
      break;
    case "validateDescription":
      updatedState = {
        ...state,
        isDescriptionValid: action.isDescriptionValid,
      };
      break;
    case "dueDateInput":
      updatedState = { ...state, duedate: action.duedate };
      break;
    case "validateDueDate":
      updatedState = { ...state, isDueDateValid: action.isDueDateValid };
      break;
    case "typeInput":
      updatedState = { ...state, taskType: action.taskType };
      break;
    case "validateType":
      updatedState = { ...state, isTypeValid: action.isTypeValid };
      break;
    default:
      updatedState = state;
      break;
  }
  return updatedState;
};

export default TaskReducer;
