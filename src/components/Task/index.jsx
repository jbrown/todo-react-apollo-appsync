import React from "react";
import { Flex, Box, CloseButton, Truncate } from "pcln-design-system";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { Comment } from "../index";

export const Task = ({ id, name, onDelete }) => (
  <Flex flexDirection="row">
    <Box width={1}>
      <Link to={"/tasks/" + id}>
        <Truncate>{name}</Truncate>
      </Link>
    </Box>
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
