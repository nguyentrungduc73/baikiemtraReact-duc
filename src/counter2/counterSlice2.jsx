import { FaUserAlt } from "react-icons/fa";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    key: 1,
    age: 10,
  },
};

export const counterSlice2 = createSlice({
  name: "counter3",
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value.age += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } =
  counterSlice2.actions;

export default counterSlice2.reducer;
