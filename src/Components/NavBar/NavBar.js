import React from "react";
import ReactDOM from "react-dom";
import { Nav, Navbar, Container } from "react-bootstrap";
import "../../Assets/NavBar.css";

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
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <React.Fragment>
          <Navbar bg="primary" variant="dark">
            <Container>
              <Navbar.Brand>{props.header}</Navbar.Brand>
              <Nav className="me-auto"></Nav>
            </Container>
          </Navbar>
        </React.Fragment>,
        document.getElementById("top-navnar")
      )}
    </React.Fragment>
  );
};

export default NavBar;
