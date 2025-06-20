
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface TaskState {
  taskId: string | null;
}

const initialState: TaskState = {
  taskId: null,
};

const taskIdSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTaskId: (state, action: PayloadAction<string>) => {
      state.taskId = action.payload;
    },
    clearTaskId: (state) => {
      state.taskId = null;
    },
  },
});

export const { setTaskId, clearTaskId } = taskIdSlice.actions;
export default taskIdSlice.reducer;
