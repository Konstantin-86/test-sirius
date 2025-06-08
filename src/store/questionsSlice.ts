
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from "@reduxjs/toolkit";

interface QuestionsState {
    childName: string;
    childDOB: string;
    childGender: string | null;
    parentName: string;
    answers: Record<string, string | null>;
}

const initialState: QuestionsState = {
    childName: '',
    childDOB: '',
    childGender: null,
    parentName: '',
    answers: {},
};

const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        setChildName: (state, action: PayloadAction<string>) => {
            state.childName = action.payload;
        },
        setChildDOB: (state, action: PayloadAction<string>) => {
            state.childDOB = action.payload;
        },
        setChildGender: (state, action: PayloadAction<string | null>) => {
            state.childGender = action.payload;
        },
        setParentName: (state, action: PayloadAction<string>) => {
            state.parentName = action.payload;
        },
        setAnswer: (state, action: PayloadAction<{ id: string; value: string | null }>) => {
            state.answers[action.payload.id] = action.payload.value;
        },
        resetQuestions: () => initialState,
    },
});

export const {
    setChildName,
    setChildDOB,
    setChildGender,
    setParentName,
    setAnswer,
    resetQuestions,
} = questionsSlice.actions;

export default questionsSlice.reducer;