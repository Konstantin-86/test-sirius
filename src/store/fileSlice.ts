import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from "@reduxjs/toolkit";
import type { FileMetadata } from "../types/types";



interface TaskState {
    taskId: string | null;
    uploadedFilesMetadata: FileMetadata[];
}

const initialState: TaskState = {
    taskId: null,
    uploadedFilesMetadata: [],
};

export const fileSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        setFile: (state, action: PayloadAction<string>) => {
            state.taskId = action.payload;
        },
        setUploaded: (state, action: PayloadAction<FileMetadata[]>) => {
            state.uploadedFilesMetadata.forEach(file => URL.revokeObjectURL(file.preview));
            state.uploadedFilesMetadata = action.payload;
        },
        updateUploaded: (state, action: PayloadAction<{ index: number; metadata: FileMetadata }>) => {
            const { index, metadata } = action.payload;
            if (state.uploadedFilesMetadata[index]) {
                URL.revokeObjectURL(state.uploadedFilesMetadata[index].preview);
            }
            state.uploadedFilesMetadata[index] = metadata;
        },
        clearUploadedFiles: (state) => {
            state.uploadedFilesMetadata.forEach(file => URL.revokeObjectURL(file.preview));
            state.uploadedFilesMetadata = [];
        },
    },
});

export const {
    setFile,
    setUploaded,
    updateUploaded,
    clearUploadedFiles
} = fileSlice.actions;

export default fileSlice.reducer;