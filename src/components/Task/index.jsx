import React from "react";
import { Flex, OutlineButton, CloseButton, Truncate } from "pcln-design-system";
import gql from "graphql-tag";
import { Box, Comment } from "../index";

export const Task = ({
  completed,
  id,
  name,
  isSelected,
  onUpdate,
  onDelete,
  onSelect
}) => (
  <Flex flexDirection="row" mb={1} bg={isSelected ? "#fff6dd" : null}>
    <Box flex={1}>
      <Truncate onClick={onSelect}>{name}</Truncate>
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

Task.fragments = {
  task: gql`
    fragment TaskFields on Task {
      id
      name
      completed
      createdAt
      updatedAt
      version
      comments {
        items {
          ...CommentFields
        }
      }
    }
    ${Comment.fragments.comment}
  `
};
