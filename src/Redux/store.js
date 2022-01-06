import { createStore } from "redux";

const initialState = { tasks: [], isLoading: false, notification: {} };
const taskManager = (taskState = initialState, action) => {
  if (action.type === "fetch") {
    return {
      tasks: action.tasks,
      isLoading: taskState.isLoading,
      notification: taskState.notification,
    };
  }
  if (action.type === "add") {
    return {
      tasks: [...taskState.tasks, action.task],
      isLoading: taskState.isLoading,
      notification: taskState.notification,
    };
  }
  if (action.type === "edit") {
    const updatedTasks = [];
    for (let i = 0; i < taskState.tasks.length; i++) {
      if (taskState.tasks[i].id === action.task.id) {
        updatedTasks.push(action.task);
      } else {
        updatedTasks.push(taskState.tasks[i]);
      }
    }
    return {
      tasks: updatedTasks,
      isLoading: taskState.isLoading,
      notification: taskState.notification,
    };
  }
  if (action.type === "delete") {
    return {
      tasks: [
        ...taskState.tasks.filter((task) => {
          return task.id !== action.taskId;
        }),
      ],
      isLoading: taskState.isLoading,
      notification: taskState.notification,
    };
  }

  if (action.type === "loading") {
    return {
      tasks: taskState.tasks,
      isLoading: action.loading,
      notification: taskState.notification,
    };
  }
  if (action.type === "notification") {
    return {
      tasks: taskState.tasks,
      isLoading: action.loading,
      notification: action.notification,
    };
  }
  return taskState;
};
const store = createStore(taskManager);

export default store;
