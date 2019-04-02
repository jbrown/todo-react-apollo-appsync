import gql from "graphql-tag";
import { addToArray, removeFromArray } from "../../lib";
import { ListFragment, listDetailQuery } from "../List/graphql";

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

export const updateCreateTask = (client, { data: { createTask } }) => {
  let detail = client.readQuery({
    query: listDetailQuery,
    variables: {
      id: createTask.list.id,
      filter: { completed: { eq: false } },
      limit: 30
    }
  });
  client.writeQuery({
    query: listDetailQuery,
    variables: {
      id: createTask.list.id,
      filter: { completed: { eq: false } },
      limit: 30
    },
    data: {
      getList: {
        ...detail.getList,
        tasks: {
          ...detail.getList.tasks,
          items: addToArray(detail.getList.tasks.items, createTask)
        }
      }
    }
  });

  let list = client.readFragment({
    id: `List:${createTask.list.id}`,
    fragment: ListFragment,
    fragmentName: "ListFields"
  });
  client.writeFragment({
    id: `List:${createTask.list.id}`,
    fragment: ListFragment,
    fragmentName: "ListFields",
    data: {
      ...list,
      tasks: {
        ...list.tasks,
        items: addToArray(list.tasks.items, createTask)
      }
    }
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

export const updateDeleteTask = (client, { data: { deleteTask } }) => {
  console.log("result", deleteTask);
  let list = client.readFragment({
    id: `List:${deleteTask.list.id}`,
    fragment: ListFragment,
    fragmentName: "ListFields"
  });

  let data = {
    ...list,
    tasks: {
      ...list.tasks,
      items: removeFromArray(list.tasks.items, deleteTask)
    }
  };
  console.log("updated", data);
  client.writeFragment({
    id: `List:${deleteTask.list.id}`,
    fragment: ListFragment,
    fragmentName: "ListFields",
    data
  });
};
