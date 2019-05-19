import React from "react";
import gql from "graphql-tag";
import styled from "styled-components";
import { Icon, Text } from "pcln-design-system";
import { Flex } from "jbrown-design-system";
import { PriorityIndicator, TagList } from "../../index";

export const TaskListItem = ({
  completed,
  id,
  name,
  priority,
  tags,
  isSelected,
  onClick
}) => (
  <TaskListItemWrapper
    flexDirection="row"
    alignItems="center"
    bg={isSelected ? "#fff6dd" : null}
    px={2}
    py={1}
    onClick={onClick}
    data-test-id="task-list-item"
  >
    <PriorityIndicator mr={1} priority={priority} />
    <Icon
      name={isSelected ? "BoxChecked" : "BoxEmpty"}
      size={18}
      color="blue"
    />
    <Text mx={1}>{name}</Text>
    <TagList tags={tags} />
  </TaskListItemWrapper>
);

TaskListItem.fragment = gql`
  fragment TaskListItemFragment on Task {
    id
    name
    completed
    createdAt
    updatedAt
    priority
    tags
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

  &:first-child {
    border-top: 1px solid ${props => props.theme.colors.borderGray};
  }
`;
