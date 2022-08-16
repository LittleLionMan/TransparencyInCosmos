import { createSlice } from "@reduxjs/toolkit";

export const valSlice = createSlice({
  name: "val",
  initialState: "",
  reducers: {
    setVal: (state, action) => (state = action.payload),
    clearVal: (state) => (state = ""),
  },
});

export const { setVal, clearVal } = valSlice.actions;

export const selectVal = (state) => state.val;

export default valSlice.reducer;