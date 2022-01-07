import { createStore } from "redux";

const initialState = {
  tasks: [],
  isLoading: false,
  notification: {},
  filteredTasks: { tasks: [], value: "" },
};
const taskManager = (taskState = initialState, action) => {
  if (action.type === "fetch") {
    return {
      tasks: action.tasks,
      isLoading: taskState.isLoading,
      notification: taskState.notification,
      filteredTasks: taskState.filteredTasks,
    };
  }
  if (action.type === "add") {
    return {
      tasks: [...taskState.tasks, action.task],
      isLoading: taskState.isLoading,
      notification: taskState.notification,
      filteredTasks: taskState.filteredTasks,
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
      filteredTasks: taskState.filteredTasks,
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
      filteredTasks: taskState.filteredTasks,
    };
  }

  if (action.type === "loading") {
    return {
      tasks: taskState.tasks,
      isLoading: action.loading,
      notification: taskState.notification,
      filteredTasks: taskState.filteredTasks,
    };
  }
  if (action.type === "notification") {
    return {
      tasks: taskState.tasks,
      isLoading: taskState.isLoading,
      notification: action.notification,
      filteredTasks: taskState.filteredTasks,
    };
  }
  if (action.type === "filter") {
    let updatedTasks = taskState.tasks;
    if (action.filterpayload.filtervalue) {
      updatedTasks = updatedTasks.filter((task) => {
        return task.title
          .toLowerCase()
          .includes(action.filterpayload.filtervalue.toLowerCase());
      });
    }
    return {
      tasks: taskState.tasks,
      isLoading: taskState.loading,
      notification: taskState.notification,
      filteredTasks: {
        tasks: updatedTasks,
        value: action.filterpayload.filtervalue,
      },
    };
  }
  return taskState;
};
const store = createStore(taskManager);

export default store;
