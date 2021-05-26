import { configureStore } from "@reduxjs/toolkit";
import myAnime from "./reducers/myAnime";

export default configureStore({
  reducer: {
    myAnime,
  },
});
