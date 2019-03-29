import React from "react";
import { Box, Flex } from "pcln-design-system";
import gql from "graphql-tag";
import { QuickAdd } from "../index";
import { Task } from "../Task";

export const List = ({ createTask, updateTask, deleteTask, list }) => (
  <Flex flexDirection="column">
    <QuickAdd
      placeholder="Add Task"
      onSubmit={value =>
        createTask({
          name: value,
          taskListId: list.id,
          completed: false
        })
      }
    />
    <Box>
      {list.tasks.items.map(item => (
        <Task
          key={item.id}
          {...item}
          onUpdate={newProps => updateTask(item, newProps)}
          onDelete={() => deleteTask(item.id, item.version)}
        />
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
