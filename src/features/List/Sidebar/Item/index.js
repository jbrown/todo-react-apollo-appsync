import React from "react";
import styled from "styled-components";
import { Badge } from "pcln-design-system";
import { Box, Flex } from "../../../../components";

const ListItemWrapper = styled(Flex)`
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
`;

export const ListSidebarItem = ({ isSelected, name, tasks, onClick }) => (
  <ListItemWrapper
    flexDirection="row"
    my={1}
    px={2}
    py={1}
    bg={isSelected ? "#fff" : null}
    onClick={onClick}
  >
    <Box flex={1}>{name}</Box>
    {tasks.items.length > 0 ? <Badge>{tasks.items.length}</Badge> : null}
  </ListItemWrapper>
);
