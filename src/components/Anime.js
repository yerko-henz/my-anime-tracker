import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

const ANIME_BY_NAME_QUERY = gql`
  query AnimeQuery($title: String!) {
    animeSearch(title: $title) {
      id_mal
      id
      title {
        romaji
      }
    }
  }
`;

const Anime = ({ match }) => {
  let { title } = match.params;

  const { loading, error, data } = useQuery(ANIME_BY_NAME_QUERY, {
    variables: { title },
  });

  if (loading) return <h4>Loading...</h4>;
  if (error) console.log(error);

  return (
    <div>
      <h3>Title: {data.animeSearch.title.romaji}</h3>
      <hr />
      <Link to="/">Back</Link>
    </div>
  );
};

export default Anime;
