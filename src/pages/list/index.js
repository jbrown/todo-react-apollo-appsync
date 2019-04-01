import React from "react";
import { Mutation } from "react-apollo";
import { List } from "../../components";
import {
  Task,
  updateCreateTask,
  updateDeleteTask,
  updateUpdateTask
} from "../../features/Task/graphql";

export const ListPage = ({ list, selectedTask, onSelectTask }) => (
  <Mutation
    mutation={Task.mutations.deleteTask}
    update={(client, mutationResult) =>
      updateDeleteTask(client, mutationResult, {
        id: list.id
      })
    }
  >
    {deleteTask => (
      <Mutation
        mutation={Task.mutations.updateTask}
        update={(client, mutationResult) =>
          updateUpdateTask(client, mutationResult, {
            id: list.id
          })
        }
      >
        {updateTask => (
          <Mutation
            mutation={Task.mutations.createTask}
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
