import React from "react";
import gql from "graphql-tag";
import { OutlineButton, CloseButton, Text } from "pcln-design-system";
import { Box, Flex } from "../../../../components";

export const TaskListItem = ({
  completed,
  id,
  name,
  isSelected,
  onUpdate,
  onDelete,
  onSelect
}) => (
  <Flex
    flexDirection="row"
    alignItems="center"
    mb={1}
    p={2}
    bg={isSelected ? "#fff6dd" : null}
  >
    <Box onClick={onSelect}>
      <input type="checkbox" checked={isSelected} />
      <Text>{name}</Text>
    </Box>
    <OutlineButton
      size="small"
      onClick={() => onUpdate({ completed: !completed })}
    >
      {completed ? "Incomplete" : "Complete"}
    </OutlineButton>
    <CloseButton onClick={onDelete}>delete</CloseButton>
  </Flex>
);

TaskListItem.fragment = gql`
  fragment TaskListItemFragment on Task {
    id
    name
    completed
    createdAt
    updatedAt
    version
    list {
      id
    }
    comments {
      items {
        id
        content
      }
    }
  }
`;
