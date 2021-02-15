import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Flex, StyledA } from "../styles/Global";

const Wrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  border: 1px solid grey;
`;

const Img = styled.img`
  width: 100%;
  height: 350px;
`;

const StyledLink = styled(Link)`
  margin-bottom: 1rem;
  text-decoration: none;
  text-overflow: ellipsis;
  width: 240px;
  overflow: hidden;
  white-space: noWrap;
`;

const ListItem = ({ id, anime }) => {
  const trailerLink = `https://www.youtube.com/watch?v=${anime.trailer?.id}`;
  const MalLink = `https://myanimelist.net/anime/${anime.idMal}`;

  return (
    <Wrapper>
      <Flex justify="space-between">
        <StyledLink to={`anime/${anime.title.romaji}`} key={id}>
          {anime.title.romaji}
        </StyledLink>
        <span>{anime.averageScore}</span>
      </Flex>
      <div>
        <Img src={anime.coverImage.large} />
      </div>
      <Flex justify="space-between">
        {anime.trailer && (
          <StyledA href={trailerLink} target="_blank" rel="noreferrer">
            Trailer
          </StyledA>
        )}
        {anime.idMal && (
          <StyledA href={MalLink} target="_blank" rel="noreferrer">
            MAL
          </StyledA>
        )}
      </Flex>
    </Wrapper>
  );
};

ListItem.propTypes = {
  id: PropTypes.number,
  anime: PropTypes.object.isRequired,
};

export default ListItem;
