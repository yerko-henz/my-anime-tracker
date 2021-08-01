import React, { useState } from "react";
import { secondsToDate } from "../helpers";

import { Flex, Button, Width, Icon, Img } from "../styles/Global";
import {
  changeAnimeEpisode,
  deleteAnime,
  changeAnimeStatus,
  toggleOptions,
} from "../reducers/myAnime";
import { useDispatch } from "react-redux";

const MyAnimeItem = ({ anime, tabOptions }) => {
  const [showModal, setShowModal] = useState({});
  const forceUpdate = useState()[1].bind(null, {});

  const dispatch = useDispatch();

  function currentStatus(props) {
    const { nextEpisode } = props;

    if (nextEpisode) {
      return `(${nextEpisode.episode}) ${secondsToDate(
        nextEpisode.timeUntilAiring
      )}`;
    } else {
      return "TBD";
    }
  }

  const watched = JSON.parse(localStorage.getItem(anime.id))?.watched || 0;

  return (
    <>
      <Width width="95%" className="box my-0" key={anime.id}>
        <h3
          onClick={async () => {
            await changeAnimeEpisode(anime.id, watched + 1);
            forceUpdate();
          }}
          className="pointer no-double-click-selection"
          onContextMenu={async (e) => {
            e.preventDefault();
            await changeAnimeEpisode(anime.id, watched - 1);
            forceUpdate();
          }}
        >
          {anime.title.romaji}
        </h3>
        <Img src={anime.coverImage.large} />
        <progress
          className="progress is-success is-small mt-4 pointer"
          onClick={async () => {
            await changeAnimeEpisode(anime.id, watched + 1);
            forceUpdate();
          }}
          onContextMenu={async (e) => {
            e.preventDefault();
            await changeAnimeEpisode(anime.id, watched - 1);
            forceUpdate();
          }}
          value={watched}
          max={anime.episodes}
        />
        <Flex justify="space-between">
          <span>
            {currentStatus({
              status: anime.status,
              nextEpisode: anime.nextAiringEpisode,
            })}
          </span>
          <span>{`${watched} of ${anime.episodes || "TBD"}`}</span>
        </Flex>
        <Flex justify="flex-end" margin=".5rem 0 0 0">
          <Button onClick={() => setShowModal({ value: true, id: anime.id })}>
            <span className="icon has-text-danger">
              <Icon className="mdi mdi-trash-can-outline" size="17px" />
            </span>
          </Button>
          <div
            className={anime.showOptions ? "dropdown is-active" : "dropdown"}
          >
            <div className="dropdown-trigger">
              <Button
                onClick={() => dispatch(toggleOptions({ id: anime.id }))}
                className="button"
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
            <div className="dropdown-menu" id={anime.id} role="menu">
              <div className="dropdown-content">
                {tabOptions
                  .filter((f) => f.value !== "ALL")
                  .filter((f) => f.value !== anime.tab)
                  .map((tab) => (
                    <div key={tab.value}>
                      <div
                        className="dropdown-item"
                        onClick={() => changeAnimeStatus(anime.id, tab.label)}
                      >{`TO ${tab.label}`}</div>
                      <hr className="dropdown-divider" />
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
              onClick={async () => {
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
  );
};

export default MyAnimeItem;
