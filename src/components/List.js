import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import Select from "react-select";

import ListItem from "./ListItem";
import { Flex, CardGrid } from "../styles/Global";

const Wrapper = styled.div`
  .react-select {
    width: 200px;
    &:not(:first-child) {
      margin-left: 1rem;
    }
  }
`;

const seasonOptions = [
  {
    label: "WINTER",
    value: "WINTER",
  },
  {
    label: "SPRING",
    value: "SPRING",
  },
  {
    label: "SUMMER",
    value: "SUMMER",
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
        sort: POPULARITY_DESC
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
        episodes
        trailer {
          id
        }
        status
        endDate {
          year
          month
          day
        }
        airingSchedule(notYetAired: true) {
          nodes {
            episode
            airingAt
          }
        }
        nextAiringEpisode {
          timeUntilAiring
          episode
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
      <CardGrid>
        {data.Page.media.map((anime) => (
          <ListItem key={anime.id} anime={anime} />
        ))}
      </CardGrid>
    </Wrapper>
  );
};

export default List;
