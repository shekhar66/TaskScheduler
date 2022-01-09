import ReactDOM from "react-dom";
import React from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import "./Assets/overwrite.css";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.Fragment>,
  document.getElementById("root")
);
