import React from "react";
import ReactDOM from "react-dom/client";
// import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import store from "./store.js";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
