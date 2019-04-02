import gql from "graphql-tag";
import { addToArray, removeFromArray } from "../../lib";
import { ListFragment, listDetailQuery } from "../List/graphql";
import { ListDetail } from "../List";

export const CommentFragment = gql`
  fragment CommentFields on Comment {
    id
    content
  }
`;

export const TaskFragment = gql`
  fragment TaskFields on Task {
    id
    name
    completed
    createdAt
    updatedAt
    version
    list {
      id
    }
    comments {
      items {
        ...CommentFields
      }
    }
  }
  ${CommentFragment}
`;

export const taskDetailQuery = gql`
  query GetTask($id: ID!) {
    getTask(id: $id) {
      id
      name
      completed
      version
      list {
        id
        name
      }
      comments(limit: 10) {
        items {
          id
          content
          version
        }
        nextToken
      }
    }
  }
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
          list {
            id
          }
        }
      }
    `
  }
};

export const listTasks = gql`
  query ListTasks(
    $filter: ModelTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        completed
        createdAt
        updatedAt
        list {
          id
          name
          createdAt
          updatedAt
          tasks {
            nextToken
          }
          version
        }
        comments {
          items {
            id
            content
            createdAt
            updatedAt
            version
          }
          nextToken
        }
        version
      }
      nextToken
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
