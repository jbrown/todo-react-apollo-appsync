import gql from "graphql-tag";
import { addToArray, removeFromArray } from "../../lib";
import { listDetailQuery } from "../List/Detail";
import { ListDetail } from "../List";
import { TaskListItem } from "./List/Item";

export const createTaskMutation = gql`
  mutation CreateTask($input: CreateTaskInput!) {
    createTask(input: $input) {
      ...TaskListItemFragment
    }
  }
  ${TaskListItem.fragment}
`;

export const updateTaskMutation = gql`
  mutation UpdateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      ...TaskListItemFragment
    }
  }
  ${TaskListItem.fragment}
`;

export const deleteTaskMutation = gql`
  mutation DeleteTask($input: DeleteTaskInput!) {
    deleteTask(input: $input) {
      id
      list {
        id
      }
    }
  }
`;

const updateListDetailQuery = (client, filterVariable, task, arrayFunc) => {
  let detail = client.readQuery({
    query: listDetailQuery,
    variables: {
      ...ListDetail.listDetailQueryDefaultVariables,
      id: task.list.id,
      filter: filterVariable
    }
  });
  client.writeQuery({
    query: listDetailQuery,
    variables: {
      ...ListDetail.listDetailQueryDefaultVariables,
      id: task.list.id,
      filter: filterVariable
    },
    data: {
      getList: {
        ...detail.getList,
        tasks: {
          ...detail.getList.tasks,
          items: arrayFunc(detail.getList.tasks.items, task)
        }
      }
    }
  });
};

const updateIncompleteQuery = (client, task, arrayFunc) => {
  updateListDetailQuery(client, { completed: { eq: false } }, task, arrayFunc);
};

const updateCompletedQuery = (client, task, arrayFunc) => {
  updateListDetailQuery(client, { completed: { eq: true } }, task, arrayFunc);
};

export const updateCreateTask = (client, { data: { createTask } }) => {
  updateIncompleteQuery(client, createTask, addToArray);
};

export const updateUpdateTask = (client, { data: { updateTask } }) => {
  updateIncompleteQuery(
    client,
    updateTask,
    updateTask.completed ? removeFromArray : addToArray
  );
  updateCompletedQuery(
    client,
    updateTask,
    updateTask.completed ? addToArray : removeFromArray
  );
};

export const updateDeleteTask = (client, { data: { deleteTask } }) => {
  updateIncompleteQuery(client, deleteTask, removeFromArray);
  updateCompletedQuery(client, deleteTask, removeFromArray);
};
