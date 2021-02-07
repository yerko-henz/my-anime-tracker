import React from "react";
import { Link } from "react-router-dom";

const ListItem = ({ id, anime }) => {
  return (
    <li>
      <Link to={`anime/${anime.title.romaji}`} key={id}>
        {anime.title.romaji}
      </Link>
    </li>
  );
};

// link = https://www.youtube.com/watch?v={anime.trailer.id}

export default ListItem;
