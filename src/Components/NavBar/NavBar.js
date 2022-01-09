import React from "react";
import ReactDOM from "react-dom";
import { Nav, Navbar, Container } from "react-bootstrap";
import "../../Assets/NavBar.css";
import { useDispatch } from "react-redux";

export const TopHeader = (props) => {
  return (
    <Navbar className="top-header">
      <Container>
        <Navbar.Brand></Navbar.Brand>
        <Nav className="me-auto nav-top-bar-buttons">{props.children}</Nav>
      </Container>
    </Navbar>
  );
};

const NavBar = (props) => {
  const dispatch = useDispatch();
  const logoutHandler = (event) => {
    localStorage.removeItem("loggedIn");
    dispatch({ type: "login", value: false });
  };
  const isLoggedIn = localStorage.getItem("loggedIn");
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <React.Fragment>
          <Navbar bg="primary" variant="dark">
            <Container>
              <Navbar.Brand>{props.header}</Navbar.Brand>
              <Nav className="me-auto logout-button">
                {isLoggedIn && (
                  <button
                    className="form-control btn-secondary"
                    onClick={logoutHandler}
                  >
                    Logout
                  </button>
                )}
              </Nav>
            </Container>
          </Navbar>
        </React.Fragment>,
        document.getElementById("top-navnar")
      )}
    </React.Fragment>
  );
};

export default NavBar;
