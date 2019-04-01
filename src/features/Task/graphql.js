import gql from "graphql-tag";
import { addToArray, removeFromArray } from "../../lib";
import { ListPage } from "../../pages";
import { CommentFragment } from "../Comment/graphql";

export const TaskFragment = gql`
  fragment TaskFields on Task {
    id
    name
    completed
    createdAt
    updatedAt
    version
    comments {
      items {
        ...CommentFields
      }
    }
  }
  ${CommentFragment}
`;

export const Task = {
  queries: {
    getTask: gql`
      query GetTask($id: ID!) {
        getTask(id: $id) {
          ...TaskFields
        }
      }
      ${TaskFragment}
    `
  },
  mutations: {
    createTask: gql`
      mutation CreateTask($input: CreateTaskInput!) {
        createTask(input: $input) {
          ...TaskFields
        }
      }
      ${TaskFragment}
    `,
    updateTask: gql`
      mutation UpdateTask($input: UpdateTaskInput!) {
        updateTask(input: $input) {
          ...TaskFields
        }
      }
      ${TaskFragment}
    `,
    deleteTask: gql`
      mutation DeleteTask($input: DeleteTaskInput!) {
        deleteTask(input: $input) {
          id
        }
      }
    `
  }
};

export const updateCreateTask = (
  client,
  { data: { createTask } },
  variables
) => {
  let origList = client.readQuery({
    query: ListPage.queries.list,
    variables
  });
  let data = {
    getList: {
      ...origList.getList,
      tasks: {
        ...origList.getList.tasks,
        items: addToArray(origList.getList.tasks.items, createTask)
      }
    }
  };
  client.writeQuery({
    query: ListPage.queries.list,
    variables,
    data
  });
};

export const updateUpdateTask = (client, { data: { updateTask } }) => {
  let task = client.readFragment({
    id: `Task:${updateTask.id}`,
    fragment: TaskFragment,
    fragmentName: "TaskFields"
  });
  let data = {
    ...task,
    ...updateTask
  };
  client.writeFragment({
    id: `Task:${updateTask.id}`,
    fragment: TaskFragment,
    fragmentName: "TaskFields",
    data
  });
};

export const updateDeleteTask = (
  client,
  { data: { deleteTask } },
  variables
) => {
  let origList = client.readQuery({
    query: ListPage.queries.list,
    variables
  });
  let data = {
    getList: {
      ...origList.getList,
      tasks: {
        ...origList.getList.tasks,
        items: removeFromArray(origList.getList.tasks.items, deleteTask)
      }
    }
  };
  client.writeQuery({
    query: ListPage.queries.list,
    variables,
    data
  });
};
