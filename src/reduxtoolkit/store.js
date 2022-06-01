import { configureStore } from "@reduxjs/toolkit";
import historyReducer from "./HistorySlide";


const rootReducer = {
  history: historyReducer,
 
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
