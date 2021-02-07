import React from "react";
import { Link } from "react-router-dom";

const ListItem = ({ id, anime }) => {
  const trailerLink = `https://www.youtube.com/watch?v=${anime.trailer?.id}`;
  const MalLink = `https://myanimelist.net/anime/${anime.idMal}`;

  return (
    <li style={{ padding: "1rem" }}>
      {anime.trailer && (
        <a href={trailerLink} target="_blank">
          Trailer
        </a>
      )}
      {anime.idMal && (
        <a href={MalLink} target="_blank">
          MAL
        </a>
      )}
      <span>{anime.averageScore}</span>
      <Link to={`anime/${anime.title.romaji}`} key={id}>
        {anime.title.romaji}
      </Link>
    </li>
  );
};

export default ListItem;
