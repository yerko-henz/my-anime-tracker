import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Grid, Flex, Button, Width, Icon, Img } from "../styles/Global";
import {
  addEpisode,
  deleteAnime,
  changeAnimeStatus,
} from "../reducers/myAnime";

const MyAnimeItem = ({ anime, tabOptions }) => {
  const [showModal, setShowModal] = useState({});
  const [formattedAnime, setFormattedAnime] = useState([]);
  const dispatch = useDispatch();

  function setEpisodeWatched(id, value) {
    dispatch(addEpisode({ id, value }));
  }

  function currentStatus(props) {
    const { nextEpisode } = props;

    if (nextEpisode) {
      return `(${nextEpisode.episode}) ${nextEpisode.timeUntilAiring}`;
    } else {
      return "TBD";
    }
  }

  useEffect(() => {
    setFormattedAnime(anime.map((m) => ({ ...m, showOptions: false })));
  }, [anime]);

  return (
    <Grid margin="2rem 0 0 0">
      {formattedAnime.map((anime) => (
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
            <Flex justify="flex-end" margin=".5rem 0 0 0">
              <Button
                onClick={() => setShowModal({ value: true, id: anime.id })}
              >
                <span className="icon has-text-danger">
                  <Icon className="mdi mdi-trash-can-outline" size="17px" />
                </span>
              </Button>
              <div
                className={
                  anime.showOptions ? "dropdown is-active" : "dropdown"
                }
              >
                <div class="dropdown-trigger">
                  <Button
                    onClick={() =>
                      setFormattedAnime(
                        formattedAnime.map((m) => {
                          if (m.id === anime.id) {
                            return { ...m, showOptions: !anime.showOptions };
                          }
                          return m;
                        })
                      )
                    }
                    class="button"
                    aria-haspopup="true"
                    aria-controls={anime.id}
                  >
                    <span className="icon has-text-warning">
                      <Icon
                        className="mdi mdi-dots-horizontal-circle-outline"
                        size="17px"
                      />
                    </span>
                  </Button>{" "}
                </div>
                <div class="dropdown-menu" id={anime.id} role="menu">
                  <div class="dropdown-content">
                    {tabOptions
                      .filter((f) => f.value !== "ALL")
                      .filter((f) => f.value !== anime.tab)
                      .map((tab) => (
                        <div key={tab.value}>
                          <div
                            class="dropdown-item"
                            onClick={() =>
                              dispatch(
                                changeAnimeStatus({
                                  id: anime.id,
                                  tab: tab.label,
                                })
                              )
                            }
                          >{`TO ${tab.label}`}</div>
                          <hr class="dropdown-divider" />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
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
  );
};

export default MyAnimeItem;
