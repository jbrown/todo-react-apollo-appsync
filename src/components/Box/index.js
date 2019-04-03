import styled from "styled-components";
import {
  alignSelf,
  borderRadius,
  flex,
  space,
  width,
  color,
  textAlign
} from "styled-system";

export const Box = styled.div`
  ${alignSelf} ${space} ${width} ${color} ${textAlign} ${flex} ${borderRadius}
`;

Box.displayName = "Box";
/*
Box.defaultProps = {
  theme: theme
};
*/
Box.propTypes = {
  ...alignSelf.propTypes,
  ...borderRadius.propTypes,
  ...flex.propTypes,
  ...space.propTypes,
  ...width.propTypes,
  ...color.propTypes,
  ...textAlign.propTypes
};

export default Box;
