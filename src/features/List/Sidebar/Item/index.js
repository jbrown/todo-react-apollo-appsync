import React from "react";
import styled from "styled-components";
import { Flex } from "../../../../components";

const ListItemWrapper = styled(Flex)`
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
`;

export default ({ isSelected, name, onClick }) => (
  <ListItemWrapper
    flexDirection="row"
    px={2}
    bg={isSelected ? "#fff" : null}
    onClick={onClick}
  >
    {name}
  </ListItemWrapper>
);
