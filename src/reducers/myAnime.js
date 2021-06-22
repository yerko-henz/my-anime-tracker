import { createSlice } from "@reduxjs/toolkit";
import { secondsToDate } from "../helpers";

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
      const { nextAiringEpisode, watched, episodes } = action.payload;

      const animeSaved = {
        ...action.payload,
        watched: watched || 0,
        episodes: episodes || "TBD",
        nextAiringEpisode: nextAiringEpisode
          ? {
              episode: nextAiringEpisode.episode,
              timeUntilAiring: secondsToDate(nextAiringEpisode.timeUntilAiring),
            }
          : null,
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
