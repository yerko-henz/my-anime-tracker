import React from "react";
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
  const { list } = useSelector((state) => state.myAnime);
  const dispatch = useDispatch();

  const trailerLink = `https://www.youtube.com/watch?v=${anime.trailer?.id}`;
  const MalLink = `https://myanimelist.net/anime/${anime.idMal}`;
  const isSaved = list.filter((f) => f.id === anime.id).length > 0;

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
          <button onClick={() => dispatch(saveAnime({ ...anime }))}>
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
