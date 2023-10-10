const Notification = ({ message }) => {
  if (!message) {
    return null;
  }

  const style = {
    border: "solid red",
    padding: 8,
    borderWidth: 2,
  };
  return <div style={style}>{message}</div>;
};

export default Notification;
