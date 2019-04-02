import React from "react";
import gql from "graphql-tag";
import { TaskListItem } from "./Item";

export const TaskList = ({
  tasks,
  updateTask,
  onDelete,
  onSelectTask,
  selectedTask
}) => (
  <React.Fragment>
    {tasks.map(item => (
      <TaskListItem
        key={item.id}
        {...item}
        isSelected={selectedTask && item.id === selectedTask.id}
        onSelect={() => onSelectTask(item)}
        onUpdate={newProps => updateTask(item, newProps)}
        onDelete={() => onDelete(item)}
      />
    ))}
  </React.Fragment>
);

TaskList.fragment = gql`
  fragment TaskListFragment on ModelTaskConnection {
    items {
      ...TaskListItemFragment
    }
    nextToken
  }
  ${TaskListItem.fragment}
`;
