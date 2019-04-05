import React, { useState } from "react";
import { compose, graphql } from "react-apollo";
import { Flex, Header } from "./components";
import { ListDetail, ListSidebar, TaskDetail } from "./features";
import {
  createTaskMutation,
  updateTaskMutation,
  deleteTaskMutation,
  updateCreateTask,
  updateDeleteTask,
  updateUpdateTask
} from "./features/Task/graphql";
import { addToArray, removeFromArray } from "./lib";

const App = ({ createTask, deleteTask, updateTask }) => {
  let [selectedList, setSelectedList] = useState(null);
  let [selectedTasks, setSelectedTasks] = useState([]);

  return (
    <Flex flexDirection="column" className="main-container">
      <Header mb={2} />
      <Flex flexDirection="row" flex={1} pb={2} px={2}>
        <ListSidebar
          flex={0.5}
          selectedList={selectedList}
          onSelectList={list => {
            setSelectedList(list);
            setSelectedTasks([]);
          }}
        />
        {selectedList ? (
          <ListDetail
            flex={1}
            list={selectedList}
            selectedTasks={selectedTasks}
            onToggleSelectTask={task => {
              let alreadySelected = selectedTasks.some(
                item => item.id === task.id
              );

              setSelectedTasks(
                alreadySelected
                  ? removeFromArray(selectedTasks, task)
                  : addToArray(selectedTasks, task)
              );
            }}
            onCreate={name => createTask(selectedList.id, name)}
            onCompleteSelected={() => {
              selectedTasks.forEach(task =>
                updateTask(task, { completed: true })
              );
              setSelectedTasks([]);
            }}
            onDeleteSelected={() => {
              selectedTasks.forEach(deleteTask);
              setSelectedTasks([]);
            }}
          />
        ) : null}
        <TaskDetail
          flex={1}
          ml={2}
          selectedTasks={selectedTasks}
          onDelete={deleteTask}
          onClearSelection={() => setSelectedTasks([])}
        />
      </Flex>
    </Flex>
  );
};

export default compose(
  graphql(createTaskMutation, {
    options: {
      update: updateCreateTask
    },
    props: props => ({
      createTask: (listId, name) =>
        props.mutate({
          variables: {
            input: {
              name,
              taskListId: listId,
              completed: false,
              priority: "NO_PRIORITY",
              tags: []
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
              priority: "NO_PRIORITY",
              tags: [],
              version: 1,
              list: {
                __typename: "List",
                id: listId
              },
              comments: {
                __typename: "ModelCommentConnection",
                items: [],
                nextToken: null
              }
            }
          }
        })
    })
  }),
  graphql(deleteTaskMutation, {
    options: {
      update: updateDeleteTask
    },
    props: props => ({
      deleteTask: task =>
        props.mutate({
          variables: { input: { id: task.id, expectedVersion: task.version } },
          optimisticResponse: {
            __typename: "Mutation",
            deleteTask: {
              __typename: "Task",
              id: task.id,
              list: {
                __typename: "List",
                id: task.list.id
              }
            }
          }
        })
    })
  }),
  graphql(updateTaskMutation, {
    options: {
      update: updateUpdateTask
    },
    props: props => ({
      updateTask: (task, newProps) =>
        props.mutate({
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
    })
  })
)(App);
