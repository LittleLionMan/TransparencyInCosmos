import { createSlice } from "@reduxjs/toolkit";

export const chainSlice = createSlice({
  name: "chain",
  initialState: "",
  reducers: {
    setChain: (state, action) => (state = action.payload),
    clearChain: (state) => (state = ""),
  },
});

export const { setChain, clearChain } = chainSlice.actions;

export const selectChain = (state) => state.chain;

export default chainSlice.reducer;