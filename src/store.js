import { configureStore } from "@reduxjs/toolkit";
import pizzaReducer from "./compontents/pizzaSlice";
export const store = configureStore({
  reducer: {
    mainDataChart: pizzaReducer,
  },
});
