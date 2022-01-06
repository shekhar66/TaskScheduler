import React, { useEffect } from "react";
import TaskForm from "./TaskForm";
import TotalTasks from "./TotalTasks";
import { useSelector, useDispatch } from "react-redux";
import LoadingSpinner from "./LoadingSpinner";

const Main = (props) => {
  const dispatch = useDispatch();
  const isLoading = useSelector((prevState) => {
    return prevState.isLoading;
  });

  useEffect(() => {
    dispatch({ type: "loading", loading: true });
    const request = async () => {
      const response = await fetch(
        "https://shekhar-test-dcbe5-default-rtdb.firebaseio.com/tasks.json",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const data = await response.json();

      const loadedTasks = [];
      for (const taskKey in data) {
        loadedTasks.push({
          id: taskKey,
          title: data[taskKey].title,
          description: data[taskKey].description,
          dueDate: data[taskKey].dueDate,
          type: data[taskKey].type,
        });
      }
      dispatch({ type: "fetch", tasks: loadedTasks });
      dispatch({ type: "loading", loading: false });
    };
    request();
  }, [dispatch]);
  const tasks = useSelector((prevTasks) => {
    return prevTasks.tasks;
  });
  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner />}
      <TaskForm />
      <TotalTasks tasks={tasks} />
    </React.Fragment>
  );
};

export default Main;
