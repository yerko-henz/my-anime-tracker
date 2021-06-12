import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

export const slice = createSlice({
  name: "myAnime",
  initialState: {
    list: [],
  },
  reducers: {
    getLSAnime: (state, action) => {
      const lsAnime = Object.keys(action.payload)
        .map((m) => ({
          ...JSON.parse(action.payload[m]),
        }))
        .filter((f) => !state.list.some((s) => s.id === f.id));
      state.list.push(...lsAnime);
    },
    saveAnime: (state, action) => {
      const animeSaved = {
        ...action.payload,
        watched: 0,
      };

      state.list.push(animeSaved);
      localStorage.setItem(animeSaved.id, JSON.stringify(animeSaved));
    },
    deleteAnime: (state, action) => {
      state.list.splice(action.payload, 1);
      localStorage.removeItem(action.payload.id);
    },
    addEpisode: (state, action) => {
      const index = state.list.findIndex(
        (anime) => anime.id === action.payload.id
      );

      const result = state.list[index].watched + action.payload.value;
      if (result >= 0) state.list[index].watched += action.payload.value;
    },
  },
});

export const { saveAnime, deleteAnime, getLSAnime, addEpisode } = slice.actions;

export default slice.reducer;
