import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useQuery, gql } from "@apollo/client";

import { getLSAnime } from "../reducers/myAnime";

const FETCH_SAVED_ANIME = gql`
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

const Nav = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { loading, error, data } = useQuery(FETCH_SAVED_ANIME, {
    variables: { ids: Object.keys(localStorage) },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    console.log("loc", location);
  }, [location]);

  useEffect(() => {
    if (data) dispatch(getLSAnime(data.Page.media));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const active = (link) => (location.pathname === link ? "is-active" : "");

  return (
    <div className="tabs is-boxed is-medium is-centered">
      <ul>
        <li className={active("/")}>
          <Link to="/">My anime</Link>
        </li>
        <li className={active("/season")}>
          <Link to="/season">Season</Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
