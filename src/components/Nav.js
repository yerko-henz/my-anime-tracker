import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-bottom: 1rem;
  padding: 1rem 0;

  a {
    padding: 0.5rem;
    text-decoration: none;
    color: #000;
    border: 1px solid #000;
    border-radius: 8px;
    margin: 1rem 1rem 0 0;
  }
`;

const Nav = () => {
  return (
    <Wrapper>
      <Link to="/">My anime</Link>
      <Link to="/season">Season</Link>
    </Wrapper>
  );
};

export default Nav;
