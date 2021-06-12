import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";

import { addEpisode, deleteAnime } from "../reducers/myAnime";

import { Grid, Flex, Button, Width, Icon } from "../styles/Global";

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
  const [showModal, setShowModal] = useState(false);

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

  // if (error) return console.log(error);

  const setEpisodeWatched = (id, value) => dispatch(addEpisode({ id, value }));

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
      <Grid margin="3rem 2rem 0 2rem">
        {myAnime.map((anime) => (
          <>
            <Flex justify="space-between" className="box my-0" key={anime.id}>
              <Width width="95%">
                <Flex justify="space-between">
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
                  <span>{`${anime.watched} of ${anime.episodes}`}</span>
                </Flex>
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
              </Width>
              <Flex direction="column">
                <Button onClick={() => setShowModal(true)}>
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
            </Flex>
            <div className={showModal ? "modal is-active" : "modal"}>
              <div
                className="modal-background"
                onClick={() => setShowModal(false)}
              ></div>
              <div className="modal-card">
                <header className="modal-card-head">
                  <p className="modal-card-title">Delete saved anime</p>
                  <button
                    className="delete"
                    aria-label="close"
                    onClick={() => setShowModal(false)}
                  />
                </header>
                <section className="modal-card-body">Are you sure?</section>
                <footer className="modal-card-foot">
                  <button
                    className="button is-danger"
                    onClick={() => {
                      dispatch(deleteAnime({ id: anime.id }));
                      setShowModal(false);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </footer>
              </div>
            </div>
          </>
        ))}
      </Grid>
    </div>
  );
};

export default MyAnime;
