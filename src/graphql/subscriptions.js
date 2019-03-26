// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateList = `subscription OnCreateList {
  onCreateList {
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
export const onUpdateList = `subscription OnUpdateList {
  onUpdateList {
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
export const onDeleteList = `subscription OnDeleteList {
  onDeleteList {
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
export const onCreateTask = `subscription OnCreateTask {
  onCreateTask {
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
export const onUpdateTask = `subscription OnUpdateTask {
  onUpdateTask {
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
export const onDeleteTask = `subscription OnDeleteTask {
  onDeleteTask {
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
export const onCreateComment = `subscription OnCreateComment {
  onCreateComment {
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
export const onUpdateComment = `subscription OnUpdateComment {
  onUpdateComment {
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
export const onDeleteComment = `subscription OnDeleteComment {
  onDeleteComment {
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
