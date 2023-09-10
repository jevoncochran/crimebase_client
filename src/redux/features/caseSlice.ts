import { Case } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

interface CaseState {
  selectedCase: Case | null;
}

const initialState = {
  selectedCase: null,
} as CaseState;

export const caseSlice = createSlice({
  name: "case",
  initialState,
  reducers: {
    setSelectedCase: (state, action) => {
      state.selectedCase = action.payload;
    },
  },
});

export const { setSelectedCase } = caseSlice.actions;

export default caseSlice.reducer;
