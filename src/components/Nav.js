import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getLSAnime } from "../reducers/myAnime";

const Nav = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("loc", location);
  }, [location]);

  useEffect(() => {
    dispatch(getLSAnime(localStorage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
