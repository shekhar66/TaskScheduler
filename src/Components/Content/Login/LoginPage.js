import { Card } from "react-bootstrap";
import "../../../Assets/LoginForm.css";
import Header from "../Task/Header";
import LoginForm from "./LoginForm";

const LoginPage = (props) => {
  return (
    <Card className="login-page-card">
      <Card.Body>
        <Card style={{ border: "none", boxShadow: "none" }}>
          <Card.Body style={{ color: "white", background: "#2d3e50" }}>
            <Header name="Login to Task Scheduler" />
            <LoginForm />
          </Card.Body>
        </Card>
      </Card.Body>
    </Card>
  );
};

export default LoginPage;
