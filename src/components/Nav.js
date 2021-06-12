import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const location = useLocation();

  useEffect(() => {
    console.log("loc", location);
  }, [location]);

  const active = (link) => (location.pathname === link ? "is-active" : "");

  return (
    <div class="tabs is-boxed is-medium is-centered">
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
