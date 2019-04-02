import React from "react";
import gql from "graphql-tag";
import styled from "styled-components";
import { Icon, Text } from "pcln-design-system";
import { Flex } from "../../../../components";

export const TaskListItem = ({ completed, id, name, isSelected, onClick }) => (
  <TaskListItemWrapper
    flexDirection="row"
    alignItems="center"
    bg={isSelected ? "#fff6dd" : null}
    p={1}
    onClick={onClick}
  >
    <Icon
      name={isSelected ? "BoxChecked" : "BoxEmpty"}
      size={24}
      color="blue"
    />
    <Text ml={2}>{name}</Text>
  </TaskListItemWrapper>
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

const TaskListItemWrapper = styled(Flex)`
  border-bottom: 1px solid ${props => props.theme.colors.borderGray};
  cursor: pointer;
`;
