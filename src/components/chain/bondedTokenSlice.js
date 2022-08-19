import { createSlice } from "@reduxjs/toolkit";

export const bondedTokenSlice = createSlice({
  name: "bondedToken",
  initialState: "",
  reducers: {
    setBondedToken: (state, action) => (state = action.payload),
    clearBondedToken: (state) => (state = ""),
  },
});

export const { setBondedToken, clearBondedToken } = bondedTokenSlice.actions;

export const selectBondedToken = (state) => state.bondedToken;

export default bondedTokenSlice.reducer;