import { useContext } from "react";
import NotificationContext from "../NotificationContext";
const Notification = (props) => {
  const [notification, notificationDispatch] = useContext(NotificationContext);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    color:"green"
  };

  return <div style={style}>{notification}</div>;
};

export default Notification;
