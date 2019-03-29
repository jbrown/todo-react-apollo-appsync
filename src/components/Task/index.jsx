import React from "react";
import { Flex, Box, Button, CloseButton, Truncate } from "pcln-design-system";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { Comment } from "../index";

export const Task = ({ completed, id, name, onUpdate, onDelete }) => (
  <Flex flexDirection="row">
    <Box width={1}>
      <Link to={"/tasks/" + id}>
        <Truncate>{name}</Truncate>
      </Link>
    </Box>
    <Button onClick={() => onUpdate({ completed: !completed })}>
      {completed ? "Incomplete" : "Complete"}
    </Button>
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
