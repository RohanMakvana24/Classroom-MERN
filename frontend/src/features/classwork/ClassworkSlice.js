import { createSlice } from "@reduxjs/toolkit";

let ClassworkSlice = createSlice({
  name: "Classwork",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {},
});

export default ClassworkSlice = ClassworkSlice.reducer;
