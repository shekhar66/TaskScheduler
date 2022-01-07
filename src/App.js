import React from "react";
import Main from "./Components/Content/Task/Main";
import NavBar from "./Components/NavBar/NavBar";

const App = () => {
  return (
    <React.Fragment>
      <NavBar header="Task Scheduler" />
      <div className="content-container">
        <Main />
      </div>
    </React.Fragment>
  );
};

export default App;
