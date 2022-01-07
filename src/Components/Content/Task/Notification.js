import ReactDOM from "react-dom";
import { Card, CloseButton } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

const Notification = (props) => {
  const dispatch = useDispatch();
  const notification = useSelector((prevState) => {
    return prevState.notification;
  });

  const closeNotification = () => {
    dispatch({
      type: "notification",
      notification: { message: "", color: "" },
    });
  };
  const NotificationContent = (
    <Card
      className="notification-card"
      style={{ display: notification.message ? "block" : "none" }}
    >
      <Card.Body
        className="notification-body"
        style={{
          background: props.color ? props.color : "#3ac13a",
        }}
      >
        {props.message}
        <CloseButton onClick={closeNotification} style={{ float: "right" }} />
      </Card.Body>
    </Card>
  );

  return ReactDOM.createPortal(
    NotificationContent,
    document.getElementById("flashes")
  );
};

export default Notification;
