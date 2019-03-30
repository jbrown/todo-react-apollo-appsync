import styled from "styled-components";
import { flex, space, width, color, textAlign } from "styled-system";
//import PropTypes from "prop-types";
//import theme from "./theme";

export const Box = styled.div`
  ${space} ${width} ${color} ${textAlign} ${flex}
`;

Box.displayName = "Box";
/*
Box.defaultProps = {
  theme: theme
};
*/
Box.propTypes = {
  ...flex.propTypes,
  ...space.propTypes,
  ...width.propTypes,
  ...color.propTypes,
  ...textAlign.propTypes
};

export default Box;
