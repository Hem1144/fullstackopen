import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const reducer = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => action.payload,
    clearNotification: () => "",
  },
});

export const { setNotification, clearNotification } = reducer.actions;

export const setNotificationWithDuration = (message, duration) => {
  return (dispatch) => {
    dispatch(setNotification(message));
    setTimeout(() => {
      dispatch(clearNotification());
    }, duration * 1000);
  };
};

export default reducer.reducer;
