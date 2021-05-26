import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "myAnime",
  initialState: {
    list: [],
  },
  reducers: {
    saveAnime: (state, action) => {
      state.list.push(action.payload);
      localStorage.setItem(action.payload.id, JSON.stringify(action.payload));
    },
    deleteAnime: (state, action) => {
      state.list.splice(action.payload, 1);
      localStorage.removeItem(action.payload.id);
    },
  },
});

export const { saveAnime, deleteAnime } = slice.actions;

export default slice.reducer;
