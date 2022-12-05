import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../counter/counterSlice";

import couterReducer2 from "../counter2/counterSlice2";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    counter2: couterReducer2,
  },
});
