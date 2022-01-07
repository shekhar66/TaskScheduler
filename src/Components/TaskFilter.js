import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";

const TaskFilter = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const tasks = useSelector((prevTasks) => {
    return prevTasks.tasks;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    const filterTimeout = setTimeout(() => {
      dispatch({
        type: "filter",
        filterpayload: { filtervalue: enteredValue },
      });
    }, 500);
    return () => {
      clearTimeout(filterTimeout);
    };
  }, [enteredValue, dispatch]);

  const filterTasksHandler = (event) => {
    setEnteredValue(event.target.value);
  };
  return (
    <React.Fragment>
      {tasks && (
        <div className="task-filter">
          <input
            id="task_filter"
            type="text"
            value={enteredValue}
            className={`form-control`}
            onChange={filterTasksHandler}
            placeholder="Filter by title.."
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default TaskFilter;
