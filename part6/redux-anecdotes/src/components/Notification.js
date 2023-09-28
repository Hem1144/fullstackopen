import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification) {
    return null;
  }

  const style = {
    border: "solid",
    padding: 8,
    borderWidth: 1,
    margin: "0 0 10px 0",
    color: "green",
  };

  return <div style={style}>{notification}</div>;
};

export default Notification;
