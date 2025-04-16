import { configureStore } from "@reduxjs/toolkit";
import {
  fetchdataReducer,
  
} from "./actions";

const store = configureStore({
  reducer: {
    data: fetchdataReducer,
    // Add the reducer
  },
});

export default store;
