import React from "react";
import { Flex } from "pcln-design-system";
import gql from "graphql-tag";
import { Box, QuickAdd } from "../index";
import { Task } from "../Task";

export const List = ({
  createTask,
  updateTask,
  deleteTask,
  list,
  selectedTask,
  onSelectTask
}) => (
  <Flex flexDirection="column">
    <QuickAdd placeholder="Add Task" onSubmit={createTask} />
    <Box>
      {list.tasks.items.map(item => (
        <Task
          key={item.id}
          {...item}
          isSelected={selectedTask && item.id === selectedTask.id}
          onSelect={() => onSelectTask(item)}
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
