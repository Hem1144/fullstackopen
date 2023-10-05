import { createContext, useContext, useReducer } from "react";
const notificationReducer = (state, action) => {
  switch (action.type) {
    case "DISPLAY_NOTIFICATION":
      return action.payload;
    case "REMOVE_NOTIFICATION":
      return "";
    default:
      return state;
  }
};

const NotificationContext = createContext();
export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};
export default NotificationContext;

export const useNotificationValue = () => {
  const notification = useContext(NotificationContext);
  return notification[0];
};

export const useNotificationDispatch = () => {
  const notification = useContext(NotificationContext);
  return notification[1];
};
