import { createSlice } from "@reduxjs/toolkit";

export const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    isLoading: false,
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const selectLoding = (state: { isLoading: boolean }) => state.isLoading;

export const { setIsLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
