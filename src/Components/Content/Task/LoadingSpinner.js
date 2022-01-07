import ReactDOM from "react-dom";
import { Spinner } from "react-bootstrap";
import React from "react";

const LoadingSpinner = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>,
        document.getElementById("loading_spinner")
      )}
      {ReactDOM.createPortal(
        <div className="backdrop-lay"></div>,
        document.getElementById("backdrop")
      )}
    </React.Fragment>
  );
};
export default LoadingSpinner;
