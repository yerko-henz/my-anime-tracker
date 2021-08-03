import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "myAnime",
  initialState: {
    list: [],
  },
  reducers: {
    getLSAnime: (state, action) => {
      state.list = action.payload.map((anime) => ({
        ...anime,
        showOptions: false,
        tab: JSON.parse(localStorage.getItem(anime.id)).tab,
      }));
    },
    deleteAnime: (state, action) => {
      const index = state.list.findIndex(
        (anime) => anime.id === action.payload.id
      );

      state.list.splice(index, 1);
      localStorage.removeItem(action.payload.id);
    },
    toggleOptions: (state, action) => {
      const index = findIndexById(action.payload.id, state.list);

      state.list[index].showOptions = !state.list[index].showOptions;
    },
    changeTab: (state, action) => {
      const index = findIndexById(action.payload.id, state.list);

      state.list[index].tab = action.payload.tab;

      changeAnimeProperty(action.payload.id, action.payload.tab, "tab");
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

// export const deleteAnime = (id) => localStorage.removeItem(id);

export const changeAnimeProperty = async (id, newValue, key) => {
  const anime = { ...JSON.parse(localStorage.getItem(id)), [key]: newValue };
  updateLocalStorage(id, anime);
};

export const { getLSAnime, deleteAnime, changeTab, toggleOptions } =
  slice.actions;

export default slice.reducer;
