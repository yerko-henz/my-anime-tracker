import { createSlice } from "@reduxjs/toolkit";

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
        episodes: action.payload.episodes || "TBD",
      };

      state.list.push(animeSaved);
      localStorage.setItem(animeSaved.id, JSON.stringify(animeSaved));
    },
    deleteAnime: (state, action) => {
      const index = state.list.findIndex(
        (anime) => anime.id === action.payload.id
      );

      state.list.splice(index, 1);
      localStorage.removeItem(action.payload.id);
    },
    addEpisode: (state, action) => {
      const index = state.list.findIndex(
        (anime) => anime.id === action.payload.id
      );

      const result = state.list[index].watched + action.payload.value;
      console.log("result", result);
      if (result >= 0 && result <= state.list[index].episodes) {
        state.list[index].watched += action.payload.value;
        localStorage.setItem(
          action.payload.id,
          JSON.stringify(state.list[index])
        );
      }
    },
  },
});

export const { saveAnime, deleteAnime, getLSAnime, addEpisode } = slice.actions;

export default slice.reducer;
