import React from "react";
import { Box, Flex, QuickAdd } from "../index";
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
