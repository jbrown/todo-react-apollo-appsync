// eslint-disable
// this is an auto generated file. This will be overwritten

export const getList = `query GetList($id: ID!) {
  getList(id: $id) {
    id
    name
    createdAt
    updatedAt
    tasks {
      items {
        id
        name
        completed
        createdAt
        updatedAt
        dueAt
        priority
        tags
        version
      }
      nextToken
    }
    version
  }
}
`;
export const listLists = `query ListLists(
  $filter: ModelListFilterInput
  $limit: Int
  $nextToken: String
) {
  listLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      createdAt
      updatedAt
      tasks {
        nextToken
      }
      version
    }
    nextToken
  }
}
`;
export const getTask = `query GetTask($id: ID!) {
  getTask(id: $id) {
    id
    name
    completed
    createdAt
    updatedAt
    dueAt
    priority
    tags
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
}
`;
export const listTasks = `query ListTasks(
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
      dueAt
      priority
      tags
      list {
        id
        name
        createdAt
        updatedAt
        version
      }
      comments {
        nextToken
      }
      version
    }
    nextToken
  }
}
`;
export const getComment = `query GetComment($id: ID!) {
  getComment(id: $id) {
    id
    content
    createdAt
    updatedAt
    task {
      id
      name
      completed
      createdAt
      updatedAt
      dueAt
      priority
      tags
      list {
        id
        name
        createdAt
        updatedAt
        version
      }
      comments {
        nextToken
      }
      version
    }
    version
  }
}
`;
export const listComments = `query ListComments(
  $filter: ModelCommentFilterInput
  $limit: Int
  $nextToken: String
) {
  listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      content
      createdAt
      updatedAt
      task {
        id
        name
        completed
        createdAt
        updatedAt
        dueAt
        priority
        tags
        version
      }
      version
    }
    nextToken
  }
}
`;
