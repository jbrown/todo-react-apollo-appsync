import React from "react";
import { Flex, OutlineButton, CloseButton, Truncate } from "pcln-design-system";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { Box, Comment } from "../index";

export const Task = ({ completed, id, name, onUpdate, onDelete }) => (
  <Flex flexDirection="row" mb={1}>
    <Box flex={1}>
      <Link to={"/tasks/" + id}>
        <Truncate>{name}</Truncate>
      </Link>
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
