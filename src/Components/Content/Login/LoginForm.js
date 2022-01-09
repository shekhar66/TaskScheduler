import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

const LoginForm = (props) => {
  const dispatch = useDispatch();
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
    if (!event.target.value) {
      setEmailIsValid(false);
      setEmailError("Email should not be empty");
    } else if (!event.target.value.includes("@")) {
      setEmailIsValid(false);
      setEmailError("Invalid Email");
    } else {
      setEmailIsValid(true);
    }
  };
  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
    if (!event.target.value) {
      setPasswordIsValid(false);
      setPasswordError("Password should not be empty");
    } else if (event.target.value.length < 4) {
      setPasswordIsValid(false);
      setPasswordError("Password must be atleast 4 characters");
    } else {
      setPasswordIsValid(true);
    }
  };
  const loginHandler = (event) => {
    event.preventDefault();
    if (!enteredEmail) {
      setEmailIsValid(false);
      setEmailError("Email should not be empty");
    }
    if (!enteredPassword) {
      setPasswordIsValid(false);
      setPasswordError("Password should not be empty");
    }
    if (enteredEmail && enteredPassword && emailIsValid && passwordIsValid) {
      dispatch({ type: "login", value: true });
      localStorage.setItem("loggedIn", true);
    }
  };

  return (
    <form onSubmit={loginHandler}>
      <div>
        <label className={`form-label`} htmlFor="login_email">
          Email
        </label>
        <input
          id="login_email"
          type="email"
          className={`form-control`}
          onChange={emailChangeHandler}
          value={enteredEmail}
          placeholder="This field is required..."
        />
        {!emailIsValid && <span style={{ color: "red" }}>{emailError}</span>}
      </div>
      <div style={{ marginTop: "1%" }}>
        <label className={`form-label`} htmlFor="login_password">
          Password
        </label>
        <input
          id="login_password"
          type="password"
          className={`form-control`}
          onChange={passwordChangeHandler}
          value={enteredPassword}
          placeholder="This field is required..."
        />
        {!passwordIsValid && (
          <span style={{ color: "red" }}>{passwordError}</span>
        )}
        <div style={{ marginTop: "10%" }}>
          <button
            className="form-control btn-primary"
            style={{
              width: "40%",
              position: "relative",
              left: "32%",
              marginBottom: "8px",
            }}
            type="submit"
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
