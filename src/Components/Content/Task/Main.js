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
    const request = async () => {
      try {
        const response = await fetch("http://localhost:3002/tasks", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();

        const loadedTasks = [];
        for (const taskKey in data) {
          loadedTasks.push({
            id: data[taskKey]._id,
            title: data[taskKey].title,
            description: data[taskKey].description,
            duedate: data[taskKey].duedate.substring(0, 10),
            type: data[taskKey].type,
          });
        }
        dispatch({ type: "fetch", tasks: loadedTasks });
      } catch (error) {}
    };
    request();
  }, [dispatch, isLoading]);
  const tasks = useSelector((prevTasks) => {
    return prevTasks.tasks;
  });
  const filteredTasks = useSelector((prevTasks) => {
    return prevTasks.filteredTasks;
  });
  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner />}
      <TaskForm />
      <TotalTasks tasks={filteredTasks.value ? filteredTasks.tasks : tasks} />
    </React.Fragment>
  );
};

export default Main;
