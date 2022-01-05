import React from "react";
import Header from "./Header";
import Tasks from "./Tasks";

const TotalTasks = (props) => {
  const deleteTaskHandler = (data) => props.onTaskDelete(data);
  const updateTaskHandler = (updatedTask) => {
    props.onUpdateTask(updatedTask);
  };
  let content = (
    <Header
      name={
        props.isLoading
          ? "Loading....!!!!"
          : "No Tasks Found..!! Try by adding new..!!"
      }
      style={{ color: "darkslateblue" }}
    />
  );
  if (props.tasks.length) {
    content = (
      <Tasks
        onUpdateTask={updateTaskHandler}
        onDeleteTask={deleteTaskHandler}
        tasks={props.tasks}
      />
    );
  }
  return <React.Fragment>{content}</React.Fragment>;
};

export default TotalTasks;
