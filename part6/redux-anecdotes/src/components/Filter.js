// components/Filter.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, clearFilter } from "../reducers/filterReducer";

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);

  const handleChange = (event) => {
    const newFilter = event.target.value;
    dispatch(setFilter(newFilter));
  };

  const clear = () => {
    dispatch(clearFilter());
  };

  const style = {
    marginBottom: 10,
  };

  const inputStyle = {
    borderRadius: 2,
    borderColor: "#ccc",
    backgroundColor: "#ffffff",
    color: "#000000",
    padding: "5px",
    transition: "border-color 0.3s",
  };

  const inputStyleHover = {
    borderColor: "#0000ff",
  };
  const buttonStyle = {
    borderRadius: 2,
    borderColor: "#0000ff",
    backgroundColor: "#ffffff",
    color: "#0000ff",
    cursor: "pointer",
    padding: "5px 10px",
  };

  return (
    <div style={style}>
      Filter{" "}
      <input
        onChange={handleChange}
        value={filter}
        style={{ ...inputStyle, ...(filter && inputStyleHover) }}
      />
      <button onClick={clear} style={buttonStyle}>
        Clear
      </button>
    </div>
  );
};

export default Filter;
