import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";

import ListItem from "./ListItem";

const ANIME_QUERY = gql`
  query AnimeList($season: MediaSeason, $year: Int) {
    Page(page: 1, perPage: 30) {
      media(season: $season, seasonYear: $year, sort: SCORE_DESC) {
        id
        idMal
        title {
          romaji
        }
        coverImage {
          large
        }
        averageScore
        trailer {
          id
        }
      }
    }
  }
`;

const List = () => {
  const [season, setSeason] = useState("SUMMER");
  const [year, setYear] = useState(2020);

  const { loading, error, data } = useQuery(ANIME_QUERY, {
    variables: { season, year },
  });

  if (loading) return <h4>Loading...</h4>;
  if (error) return console.log(error);

  return (
    <ul>
      {data.Page.media.map((anime) => (
        <ListItem key={anime.id} anime={anime} />
      ))}
    </ul>
  );
};

export default List;
