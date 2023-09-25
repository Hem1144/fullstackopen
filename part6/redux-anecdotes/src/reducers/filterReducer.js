// const filterReducer = (state = "", action) => {
//   switch (action.type) {
//     case "SET_FILTER":
//       return action.filter;
//     case "CLEAR_FILTER":
//       return "";
//     default:
//       return state;
//   }
// };

// export const setFilter = (filter) => {
//   return {
//     type: "SET_FILTER",
//     filter,
//   };
// };

// export const clearFilter = () => {
//   return {
//     type: "CLEAR_FILTER",
//   };
// };

// export default filterReducer;

import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    setFilter: (state, action) => action.payload,
    clearFilter: () => "",
  },
});

export const { setFilter, clearFilter } = filterSlice.actions;
export default filterSlice.reducer;
