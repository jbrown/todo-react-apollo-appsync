// eslint-disable
// this is an auto generated file. This will be overwritten

export const createList = `mutation CreateList($input: CreateListInput!) {
  createList(input: $input) {
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
    version
  }
}
`;
export const updateList = `mutation UpdateList($input: UpdateListInput!) {
  updateList(input: $input) {
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
    version
  }
}
`;
export const deleteList = `mutation DeleteList($input: DeleteListInput!) {
  deleteList(input: $input) {
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
    version
  }
}
`;
export const createTask = `mutation CreateTask($input: CreateTaskInput!) {
  createTask(input: $input) {
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
        items {
          id
          name
          completed
          createdAt
          updatedAt
          version
        }
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
        task {
          id
          name
          completed
          createdAt
          updatedAt
          version
        }
        version
      }
      nextToken
    }
    version
  }
}
`;
export const updateTask = `mutation UpdateTask($input: UpdateTaskInput!) {
  updateTask(input: $input) {
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
        items {
          id
          name
          completed
          createdAt
          updatedAt
          version
        }
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
        task {
          id
          name
          completed
          createdAt
          updatedAt
          version
        }
        version
      }
      nextToken
    }
    version
  }
}
`;
export const deleteTask = `mutation DeleteTask($input: DeleteTaskInput!) {
  deleteTask(input: $input) {
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
        items {
          id
          name
          completed
          createdAt
          updatedAt
          version
        }
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
        task {
          id
          name
          completed
          createdAt
          updatedAt
          version
        }
        version
      }
      nextToken
    }
    version
  }
}
`;
export const createComment = `mutation CreateComment($input: CreateCommentInput!) {
  createComment(input: $input) {
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
    version
  }
}
`;
export const updateComment = `mutation UpdateComment($input: UpdateCommentInput!) {
  updateComment(input: $input) {
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
    version
  }
}
`;
export const deleteComment = `mutation DeleteComment($input: DeleteCommentInput!) {
  deleteComment(input: $input) {
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
    version
  }
}
`;
