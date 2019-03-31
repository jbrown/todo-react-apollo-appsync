import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { addToArray, removeFromArray } from "../../lib";
import { List, Task } from "../../components";

const updateCreateTask = (client, { data: { createTask } }, variables) => {
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

const updateUpdateTask = (client, { data: { updateTask } }) => {
  let task = client.readFragment({
    id: `Task:${updateTask.id}`,
    fragment: Task.fragments.task,
    fragmentName: "TaskFields"
  });
  let data = {
    ...task,
    ...updateTask
  };
  client.writeFragment({
    id: `Task:${updateTask.id}`,
    fragment: Task.fragments.task,
    fragmentName: "TaskFields",
    data
  });
};

const updateDeleteTask = (client, { data: { deleteTask } }, variables) => {
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

export const ListPage = ({ list, selectedTask, onSelectTask }) => (
  <Mutation
    mutation={ListPage.mutations.deleteTask}
    update={(client, mutationResult) =>
      updateDeleteTask(client, mutationResult, {
        id: list.id
      })
    }
  >
    {deleteTask => (
      <Mutation
        mutation={ListPage.mutations.updateTask}
        update={(client, mutationResult) =>
          updateUpdateTask(client, mutationResult, {
            id: list.id
          })
        }
      >
        {updateTask => (
          <Mutation
            mutation={ListPage.mutations.createTask}
            update={(client, mutationResult) =>
              updateCreateTask(client, mutationResult, {
                id: list.id
              })
            }
          >
            {createTask => (
              <List
                list={list}
                selectedTask={selectedTask}
                onSelectTask={onSelectTask}
                createTask={name =>
                  createTask({
                    variables: {
                      input: {
                        name,
                        taskListId: list.id,
                        completed: false
                      }
                    },
                    optimisticResponse: {
                      __typename: "Mutation",
                      createTask: {
                        __typename: "Task",
                        id: "-1",
                        name,
                        completed: false,
                        createdAt: "",
                        updatedAt: "",
                        version: 1,
                        comments: {
                          __typename: "ModelCommentConnection",
                          items: [],
                          nextToken: null
                        }
                      }
                    }
                  })
                }
                updateTask={(task, newProps) =>
                  updateTask({
                    variables: {
                      input: {
                        ...newProps,
                        id: task.id,
                        expectedVersion: task.version
                      }
                    },
                    optimisticResponse: {
                      __typename: "Mutation",
                      updateTask: {
                        __typename: "Task",
                        ...task,
                        ...newProps,
                        version: task.version + 1
                      }
                    }
                  })
                }
                deleteTask={(id, expectedVersion) =>
                  deleteTask({
                    variables: { input: { id, expectedVersion } },
                    optimisticResponse: {
                      __typename: "Mutation",
                      deleteTask: {
                        __typename: "Task",
                        id
                      }
                    }
                  })
                }
              />
            )}
          </Mutation>
        )}
      </Mutation>
    )}
  </Mutation>
);

ListPage.queries = {
  list: gql`
    query GetList($id: ID!) {
      getList(id: $id) {
        ...ListFields
      }
    }
    ${List.fragments.list}
  `
};

ListPage.mutations = {
  createTask: gql`
    mutation CreateTask($input: CreateTaskInput!) {
      createTask(input: $input) {
        ...TaskFields
      }
    }
    ${Task.fragments.task}
  `,
  updateTask: gql`
    mutation UpdateTask($input: UpdateTaskInput!) {
      updateTask(input: $input) {
        ...TaskFields
      }
    }
    ${Task.fragments.task}
  `,
  deleteTask: gql`
    mutation DeleteTask($input: DeleteTaskInput!) {
      deleteTask(input: $input) {
        id
      }
    }
  `
};
