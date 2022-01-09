import { createStore } from "redux";

const initialState = {
  tasks: [],
  isLoading: false,
  notification: {},
  filteredTasks: { tasks: [], value: "" },
  loggedIn: false,
};
const taskManager = (prevState = initialState, action) => {
  if (action.type === "fetch") {
    return {
      tasks: action.tasks,
      isLoading: prevState.isLoading,
      notification: prevState.notification,
      filteredTasks: prevState.filteredTasks,
      loggedIn: prevState.loggedIn,
    };
  }
  if (action.type === "add") {
    return {
      tasks: [...prevState.tasks, action.task],
      isLoading: prevState.isLoading,
      notification: prevState.notification,
      filteredTasks: prevState.filteredTasks,
      loggedIn: prevState.loggedIn,
    };
  }
  if (action.type === "edit") {
    const updatedTasks = [];
    for (let i = 0; i < prevState.tasks.length; i++) {
      if (prevState.tasks[i].id === action.task.id) {
        updatedTasks.push(action.task);
      } else {
        updatedTasks.push(prevState.tasks[i]);
      }
    }
    return {
      tasks: updatedTasks,
      isLoading: prevState.isLoading,
      notification: prevState.notification,
      filteredTasks: prevState.filteredTasks,
      loggedIn: prevState.loggedIn,
    };
  }
  if (action.type === "delete") {
    return {
      tasks: [
        ...prevState.tasks.filter((task) => {
          return task.id !== action.taskId;
        }),
      ],
      isLoading: prevState.isLoading,
      notification: prevState.notification,
      filteredTasks: prevState.filteredTasks,
      loggedIn: prevState.loggedIn,
    };
  }

  if (action.type === "loading") {
    return {
      tasks: prevState.tasks,
      isLoading: action.loading,
      notification: prevState.notification,
      filteredTasks: prevState.filteredTasks,
      loggedIn: prevState.loggedIn,
    };
  }
  if (action.type === "notification") {
    return {
      tasks: prevState.tasks,
      isLoading: prevState.isLoading,
      notification: action.notification,
      filteredTasks: prevState.filteredTasks,
      loggedIn: prevState.loggedIn,
    };
  }
  if (action.type === "filter") {
    let updatedTasks = prevState.tasks;
    if (action.filterpayload.filtervalue) {
      updatedTasks = updatedTasks.filter((task) => {
        return task.title
          .toLowerCase()
          .includes(action.filterpayload.filtervalue.toLowerCase());
      });
    }
    return {
      tasks: prevState.tasks,
      isLoading: prevState.loading,
      notification: prevState.notification,
      filteredTasks: {
        tasks: updatedTasks,
        value: action.filterpayload.filtervalue,
        loggedIn: prevState.loggedIn,
      },
    };
  }

  if (action.type === "login") {
    return {
      tasks: prevState.tasks,
      isLoading: prevState.loading,
      notification: prevState.notification,
      filteredTasks: prevState.filteredTasks,
      loggedIn: action.value,
    };
  }

  return prevState;
};
const store = createStore(taskManager);

export default store;
