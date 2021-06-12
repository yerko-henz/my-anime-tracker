import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { getLSAnime, addEpisode } from "../reducers/myAnime";

const MyAnimeWrapper = styled.ul`
  list-style: none;
  padding: 0;

  li {
    padding: 1rem;
    margin: 1rem;
    border: 1px solid #444;
    border-radius: 8px;
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

  const myAnime = useSelector((state) => state.myAnime.list);

  const dispatch = useDispatch();

  // const { loading, error, data } = useQuery(SEARCH_RESULTS, {
  //   variables: { search },
  //   fetchPolicy: "no-cache",
  // });

  // useEffect(() => {
  //   console.log("d", data, "search", search);
  // }, [data]);

  useEffect(() => {
    console.log("afas", myAnime);
  }, [myAnime]);

  useEffect(() => {
    console.log("all local storage", { ...localStorage });
    dispatch(getLSAnime(localStorage));
  }, []);

  // if (error) return console.log(error);

  return (
    <div>
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
      <div>
        {myAnime.map((m) => (
          <div
            className="box mx-6"
            key={m.id}
            onClick={(e) => dispatch(addEpisode({ id: m.id, value: 1 }))}
            onContextMenu={(e) => {
              e.preventDefault();
              dispatch(addEpisode({ id: m.id, value: -1 }));
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>{m.title.romaji}</h3>
              <span>{`${m.watched} of ${m.episodes}`}</span>
            </div>
            <progress
              className="progress is-success is-small mt-4"
              value={m.watched}
              max={m.episodes}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAnime;
