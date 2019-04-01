import React from "react";
import { Box, Flex, QuickAdd } from "../index";
import TaskList from "../../features/Task/List";

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
      <TaskList
        tasks={list.tasks.items}
        onSelectTask={onSelectTask}
        selectedTask={selectedTask}
      />
    </Box>
  </Flex>
);
