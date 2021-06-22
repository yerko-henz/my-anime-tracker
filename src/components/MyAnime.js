import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { addEpisode, deleteAnime } from "../reducers/myAnime";

import { Grid, Flex, Button, Width, Icon } from "../styles/Global";

const Img = styled.img`
  width: 100%;
  height: 350px;
`;

const Wrapper = styled.div`
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
  const [showModal, setShowModal] = useState({});

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

  function setEpisodeWatched(id, value) {
    dispatch(addEpisode({ id, value }));
  }

  function currentStatus(props) {
    const { status, nextEpisode } = props;

    if (nextEpisode) {
      return `(${nextEpisode.episode}) ${nextEpisode.timeUntilAiring}`;
    } else {
      return "TBD";
    }
  }

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
      <Grid margin="3rem 8rem 0 8rem">
        {myAnime.map((anime) => (
          <>
            <Width width="95%" className="box my-0" key={anime.id}>
              <h3
                onClick={() => setEpisodeWatched(anime.id, 1)}
                className="pointer no-double-click-selection"
                onContextMenu={(e) => {
                  e.preventDefault();
                  setEpisodeWatched(anime.id, -1);
                }}
              >
                {anime.title.romaji}
              </h3>
              <Img src={anime.coverImage.large} />
              <progress
                className="progress is-success is-small mt-4 pointer"
                onClick={() => setEpisodeWatched(anime.id, 1)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setEpisodeWatched(anime.id, -1);
                }}
                value={anime.watched}
                max={anime.episodes}
              />
              <Flex justify="space-between">
                <span>
                  {currentStatus({
                    status: anime.status,
                    nextEpisode: anime.nextAiringEpisode,
                  })}
                </span>
                <span>{`${anime.watched} of ${anime.episodes}`}</span>
              </Flex>
              <Flex direction="column">
                <Button
                  onClick={() => setShowModal({ value: true, id: anime.id })}
                >
                  <span className="icon has-text-danger">
                    <Icon className="mdi mdi-trash-can-outline" size="17px" />
                  </span>
                </Button>
                <Button>
                  <span className="icon has-text-warning">
                    <Icon
                      className="mdi mdi-dots-horizontal-circle-outline"
                      size="17px"
                    />
                  </span>
                </Button>
              </Flex>
            </Width>

            <div className={showModal.value ? "modal is-active" : "modal"}>
              <div
                className="modal-background"
                onClick={() => setShowModal({ value: false, id: null })}
              ></div>
              <div className="modal-card">
                <header className="modal-card-head">
                  <p className="modal-card-title">Delete saved anime</p>
                  <button
                    className="delete"
                    aria-label="close"
                    onClick={() => setShowModal({ value: false, id: null })}
                  />
                </header>
                <section className="modal-card-body">Are you sure?</section>
                <footer className="modal-card-foot">
                  <button
                    className="button is-danger"
                    onClick={() => {
                      dispatch(deleteAnime({ id: showModal.id }));
                      setShowModal({ value: false, id: null });
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="button"
                    onClick={() => setShowModal({ value: false, id: null })}
                  >
                    Cancel
                  </button>
                </footer>
              </div>
            </div>
          </>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default MyAnime;
