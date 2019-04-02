import React from "react";
import gql from "graphql-tag";
import { Icon, Text } from "pcln-design-system";
import { Flex } from "../../../../components";

export const TaskListItem = ({ completed, id, name, isSelected, onSelect }) => (
  <Flex
    flexDirection="row"
    alignItems="center"
    mb={1}
    p={2}
    bg={isSelected ? "#fff6dd" : null}
    onClick={onSelect}
  >
    <Icon
      name={isSelected ? "BoxChecked" : "BoxEmpty"}
      size={24}
      color="blue"
    />
    <Text ml={2}>{name}</Text>
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
