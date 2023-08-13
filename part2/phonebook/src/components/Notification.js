import React from "react";
import "../App.css"; // Import the CSS file for styling

const Notification = ({ message, type }) => {
  if (!message) {
    return null;
  }

  return (
    <div
      className={`notification  ${type === "success" ? "success" : "error"}`}
    >
      {message}
    </div>
  );
};

export default Notification;
