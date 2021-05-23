import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import Select from "react-select";

import ListItem from "./ListItem";
import { Flex } from "../styles/Global";

const Wrapper = styled.div`
  .list-wrapper {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 1rem;

    @media (max-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media (min-width: 2560px) {
      grid-template-columns: repeat(8, 1fr);
    }
  }

  .react-select {
    width: 200px;
    &:not(:first-child) {
      margin-left: 1rem;
    }
  }
`;

const seasonOptions = [
  {
    label: "SUMMER",
    value: "SUMMER",
  },
  {
    label: "WINTER",
    value: "WINTER",
  },
  {
    label: "SPRING",
    value: "SPRING",
  },
  {
    label: "FALL",
    value: "FALL",
  },
];

const yearOptions = () => {
  const current = new Date().getFullYear();

  return Array(current - (current - 15))
    .fill()
    .map((value, index) => ({
      value: current - index,
      label: `${current - index}`,
    }));
};

const ANIME_QUERY = gql`
  query AnimeList($season: MediaSeason, $year: Int, $page: Int) {
    Page(page: $page, perPage: 48) {
      media(
        season: $season
        seasonYear: $year
        sort: SCORE_DESC
        isAdult: false
        format: TV
      ) {
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
  const [year, setYear] = useState(2021);

  const { loading, error, data } = useQuery(ANIME_QUERY, {
    variables: { season, year, page: 1 },
  });

  if (loading) return <h4>Loading...</h4>;
  if (error) return console.log(error);

  return (
    <Wrapper>
      <Flex direction="column">
        {season === "WINTER" && <div>December - February</div>}
        {season === "SPRING" && <div>March - May</div>}
        {season === "SUMMER" && <div>June - August</div>}
        {season === "FALL" && <div>September - November</div>}
        <Flex>
          <Select
            className="react-select"
            onChange={({ value }) => setSeason(value)}
            options={seasonOptions}
            defaultValue={{ value: season, label: season }}
          />

          <Select
            className="react-select"
            onChange={({ value }) => setYear(value)}
            options={yearOptions()}
            defaultValue={{ value: year, label: year }}
          />
        </Flex>
      </Flex>

      <h3>
        {season}, {year}
      </h3>
      <div className="list-wrapper">
        {data.Page.media.map((anime) => (
          <ListItem key={anime.id} anime={anime} />
        ))}
      </div>
    </Wrapper>
  );
};

export default List;
