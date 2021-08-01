import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

import { Flex, StyledA, Img } from "../styles/Global";
import { saveAnime } from "../reducers/myAnime";

const Wrapper = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const StyledLink = styled(Link)`
  margin-bottom: 1rem;
  text-decoration: none;
  text-overflow: ellipsis;
  width: 240px;
  overflow: hidden;
  white-space: noWrap;
`;

const ListItem = ({ anime }) => {
  const [isSaved, setIsSaved] = useState(false);

  const trailerLink = `https://www.youtube.com/watch?v=${anime.trailer?.id}`;
  const MalLink = `https://myanimelist.net/anime/${anime.idMal}`;
  // const isSaved = Boolean(localStorage.getItem(anime.id));

  useEffect(() => {
    setIsSaved(Boolean(localStorage.getItem(anime.id)));
  }, [anime]);

  return (
    <Wrapper className="box my-0">
      <Flex justify="space-between">
        <StyledLink to={`anime/${anime.title.romaji}`} key={anime.id}>
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
        {!isSaved && (
          <button
            onClick={() => {
              saveAnime(anime.id);
              setIsSaved(true);
            }}
          >
            Save
          </button>
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
  anime: PropTypes.object.isRequired,
};

export default ListItem;
