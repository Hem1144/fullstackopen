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
