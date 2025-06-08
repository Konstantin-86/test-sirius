
import { configureStore } from "@reduxjs/toolkit";
import taskIdSlice from "./taskIdSlice";
import fileSlice from "./fileSlice";
import questionsReducer from './questionsSlice';

export const store = configureStore({
  reducer: {
    task: taskIdSlice,
    file: fileSlice,
    questions: questionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
