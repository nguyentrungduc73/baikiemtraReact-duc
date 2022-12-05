import { FaUserAlt } from "react-icons/fa";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: localStorage.getItem("userName")
    ? JSON.parse(localStorage.getItem("userName"))
    : {},
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      localStorage.removeItem("userName");
    },
    incrementByAmount: (state, action) => {
      state.value = action.payload;
      localStorage.setItem("userName", JSON.stringify(state.value));
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
