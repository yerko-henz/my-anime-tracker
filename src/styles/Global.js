import styled from "styled-components";
import PropTypes from "prop-types";

export const Flex = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  align-items: ${({ align }) => align};
  justify-content: ${({ justify }) => justify};
`;

export const StyledA = styled.a`
  text-decoration: none;
  align-self: flex-start;
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
