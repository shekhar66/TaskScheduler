import React from "react";
import Main from "./Components/Content/Task/Main";
import NavBar from "./Components/NavBar/NavBar";
import { Route } from "react-router";
import LoginPage from "./Components/Content/Login/LoginPage";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const App = () => {
  let isLoggedIn = localStorage.getItem("loggedIn");
  useSelector((prevState) => prevState.loggedIn);
  return (
    <React.Fragment>
      <Route path="/login">
        {isLoggedIn && <Redirect to="/tasks" />}
        <React.Fragment>
          <NavBar header="Welcome to Task Scheduler..!!" />
          <LoginPage />
        </React.Fragment>
      </Route>
      <Route path="/tasks">
        {isLoggedIn && (
          <React.Fragment>
            <NavBar header="Task Scheduler" />
            <div className="content-container">
              <Main />
            </div>
          </React.Fragment>
        )}
      </Route>
      {!isLoggedIn && <Redirect to="/login" />}
    </React.Fragment>
  );
};

export default App;
