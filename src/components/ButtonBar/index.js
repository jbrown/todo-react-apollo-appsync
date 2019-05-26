import styled from "styled-components";
import { Flex } from "jbrown-design-system";

export const ButtonBar = styled(Flex)`
  border: 1px solid ${props => props.theme.colors.borderGray};
  border-radius: 4px;
`;

ButtonBar.Button = styled(Flex).attrs({
  alignItems: "center",
  flex: 1,
  justifyContent: "center",
  p: 2
})`
  border-right: 1px solid ${props => props.theme.colors.borderGray};
  cursor: pointer;
  &:last-child {
    border-right: 0;
  }
`;
