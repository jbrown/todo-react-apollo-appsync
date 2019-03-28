import React from "react";
import { Flex, Box, CloseButton, Truncate } from "pcln-design-system";
import gql from "graphql-tag";

export const Task = ({ name, onDelete }) => (
  <Flex flexDirection="row">
    <Box width={1}>
      <Truncate>{name}</Truncate>
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
    }
  `
};
