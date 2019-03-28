import React from "react";
import { Box } from "pcln-design-system";
import gql from "graphql-tag";

export const Task = ({ name }) => <Box>{name}</Box>;

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
