import styled from "styled-components";
import PropTypes from "prop-types";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  .pointer{
    cursor: pointer;
  }
  .modal-background{
    opacity: .5 !important;
  }

  .no-double-click-selection{
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;
  }
`;

export const Flex = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  align-items: ${({ align }) => align};
  justify-content: ${({ justify }) => justify};
  margin: ${({ margin }) => margin || 0};
`;

export const StyledA = styled.a`
  text-decoration: none;
  align-self: flex-start;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 4rem;
  margin: ${({ margin }) => margin || 0};
`;

export const Button = styled.button`
  cursor: pointer;
  background: transparent;
  border: none;
`;

export const Width = styled.div`
  width: ${({ width }) => width};
`;

export const Icon = styled.i`
  font-size: ${({ size }) => size};

  &:hover {
    transition: 0.2s ease-in;

    opacity: 0.5;
  }
`;

export const Img = styled.img`
  width: 100%;
  height: 350px;
`;

Flex.defaultProps = {
  direction: "row",
  align: "center",
};

Flex.propTypes = {
  direction: PropTypes.string,
  align: PropTypes.string,
  justify: PropTypes.string,
};
