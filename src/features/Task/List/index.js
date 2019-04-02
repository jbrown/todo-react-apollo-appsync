import React from "react";
import gql from "graphql-tag";
import { TaskListItem } from "./Item";

export const TaskList = ({
  tasks,
  updateTask,
  onDelete,
  onToggleSelectTask,
  selectedTasks
}) => (
  <React.Fragment>
    {tasks.map(item => (
      <TaskListItem
        key={item.id}
        {...item}
        isSelected={selectedTasks.some(i => item.id === i.id)}
        onClick={() => onToggleSelectTask(item)}
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
