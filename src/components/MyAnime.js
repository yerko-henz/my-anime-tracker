import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Select from "react-select";

import MyAnimeItem from "./MyAnimeItem.js";

const tabOptions = [
  {
    value: "ALL",
    label: "ALL",
  },
  {
    value: "COMPLETED",
    label: "COMPLETED",
  },
  {
    value: "DROPPED",
    label: "DROPPED",
  },
  {
    value: "WATCH",
    label: "WATCH",
  },
];

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

const REFRESH_SAVED_ANIME = gql`
  query RefreshSaved($ids: [Int]) {
    Page {
      media(id_in: $ids) {
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

const MyAnime = () => {
  const [search, setSearch] = useState("");
  const [currentTab, setCurrentTab] = useState("ALL");

  const myAnime = useSelector((state) => state.myAnime.list);

  const ids = myAnime.map((m) => m.id);

  const dispatch = useDispatch();

  const { loading, error, refreshed_data } = useQuery(REFRESH_SAVED_ANIME, {
    variables: { ids },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    console.log("data", refreshed_data);
  }, [refreshed_data]);

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
      <MyAnimeItem anime={myAnime} />
    </Wrapper>
  );
};

export default MyAnime;
