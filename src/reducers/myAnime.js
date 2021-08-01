import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "myAnime",
  initialState: {
    list: [],
    updating: false,
  },
  reducers: {
    getLSAnime: (state, action) => {
      state.list = action.payload; //.push(...lsAnime);
    },
    toggleOptions: (state, action) => {
      const index = findIndexById(action.payload.id, state.list);

      state.list[index].showOptions = !state.list[index].showOptions;
    },
  },
});

const findIndexById = (id, list) => list.findIndex((anime) => anime.id === id);

const updateLocalStorage = (id, item) =>
  localStorage.setItem(id, JSON.stringify(item));

export const saveAnime = (id) =>
  updateLocalStorage(id, {
    watched: 0,
    tab: "PENDING",
  });

export const deleteAnime = (id) => localStorage.removeItem(id);

export const changeAnimeEpisode = async (id, watched) => {
  const anime = { ...JSON.parse(localStorage.getItem(id)), watched };
  updateLocalStorage(id, anime);
};

export const changeAnimeStatus = async (id, tab) => {
  const anime = await { ...localStorage.getItem(id), tab };
  updateLocalStorage(id, anime);
};

export const { getLSAnime, toggleOptions } = slice.actions;

export default slice.reducer;
