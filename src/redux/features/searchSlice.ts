import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SearchFilter } from "@/types";

interface SearchState {
  searchFilter: SearchFilter | null;
  searchQuery: string | null;
}

const initialState = {
  searchFilter: null,
  searchQuery: null,
} as SearchState;

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchOptions: (state, action) => {
      state.searchFilter = action.payload.searchFilter;
      state.searchQuery = action.payload.searchQuery;
    },
  },
});

export const { setSearchOptions } = searchSlice.actions;

export default searchSlice.reducer;
