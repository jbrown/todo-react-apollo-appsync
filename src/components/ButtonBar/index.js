import styled from "styled-components";
import { Flex } from "../Flex";

export const ButtonBar = styled(Flex)`
  border: 1px solid ${props => props.theme.colors.borderGray};
  border-radius: 4px;
`;

ButtonBar.Button = styled(Flex).attrs({
  alignItems: "center",
  flex: 1,
  justifyContent: "center"
})`
  border-right: 1px solid ${props => props.theme.colors.borderGray};
  &:last-child {
    border-right: 0;
  }
`;
