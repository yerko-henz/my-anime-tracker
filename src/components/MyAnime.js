import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Select from "react-select";

import MyAnimeItem from "./MyAnimeItem.js";

const ALL = "ALL";
const COMPLETED = "COMPLETED";
const DROPPED = "DROPPED";
const WATCHING = "WATCHING";
const PENDING = "PENDING";

const notFormatted = [ALL, WATCHING, PENDING, COMPLETED, DROPPED];

const tabOptions = notFormatted.map((option) => ({
  label: option,
  value: option,
}));

const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto;

  h3 {
    text-align: center;
    padding: 1rem 0;
    font-size: 13px;
    font-weight: 700;
  }
`;

const SEARCH_RESULTS = gql`
  query ($search: String) {
    Page {
      media(search: $search) {
        id
        title {
          romaji
        }
      }
    }
  }
`;

const MyAnime = () => {
  const [search, setSearch] = useState("");
  const [currentTab, setCurrentTab] = useState(WATCHING);

  const allAnime = useSelector((state) => state.myAnime.list);
  const completedAnime = allAnime.filter((f) => f.tab === COMPLETED);
  const droppedAnime = allAnime.filter((f) => f.tab === DROPPED);
  const watchingAnime = allAnime.filter((f) => f.tab === WATCHING);
  const pendingAnime = allAnime.filter((f) => f.tab === PENDING);

  const myAnime = () => {
    switch (currentTab) {
      case ALL:
      default:
        return allAnime;
      case COMPLETED:
        return completedAnime;
      case DROPPED:
        return droppedAnime;
      case WATCHING:
        return watchingAnime;
      case PENDING:
        return pendingAnime;
    }
  };

  // useEffect(() => {
  //   console.log("d", data, "search", search);
  // }, [data]);

  // if (error) return console.log(error);

  return (
    <Wrapper>
      {/* <input value={search} onChange={(e) => setSearch(e.target.value)} /> */}
      {/* {loading ? (
        <h4>Loading...</h4>
      ) : (
        <>
          {data.Page.media.length > 0 && (
            <div>
              <h3>Results:</h3>
              <ul>
                {data.Page.media.map((anime) => (
                  <li key={anime.id}>{anime.title.romaji}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )} */}

      <Select
        className="react-select"
        onChange={({ value }) => setCurrentTab(value)}
        options={tabOptions}
        defaultValue={{ value: currentTab, label: currentTab }}
      />
      <MyAnimeItem anime={myAnime()} tabOptions={tabOptions} />
    </Wrapper>
  );
};

export default MyAnime;
