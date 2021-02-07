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

export default ListItem;
