import React from "react";
import { Box, Flex } from "pcln-design-system";
import gql from "graphql-tag";
import { QuickAdd } from "../index";
import { Task } from "../Task";

export const List = props => (
  <Flex flexDirection="column">
    <QuickAdd
      placeholder="Add Task"
      onSubmit={value =>
        props.createTask({
          input: {
            name: value,
            taskListId: props.list.id,
            completed: false
          }
        })
      }
    />
    <Box>
      {props.list.tasks.items.map(item => (
        <Task key={item.id} {...item} />
      ))}
    </Box>
  </Flex>
);

List.fragments = {
  list: gql`
    fragment ListFields on List {
      id
      name
      createdAt
      updatedAt
      version
      tasks {
        items {
          ...TaskFields
        }
      }
    }
    ${Task.fragments.task}
  `
};
