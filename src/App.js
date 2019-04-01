import React, { Component } from "react";
import { compose, graphql } from "react-apollo";
import { createGlobalStyle } from "styled-components";
import { Box, Flex, Header } from "./components";
import { ListDetail, ListSidebar, TaskDetail } from "./features";
import {
  Task,
  updateCreateTask,
  updateDeleteTask
} from "./features/Task/graphql";

const GlobalStyle = createGlobalStyle`
  html, body {
    background-color: #eee;
  }
`;

class App extends Component {
  state = {
    selectedList: null,
    selectedTask: null
  };

  render() {
    let { selectedList, selectedTask } = this.state;

    return (
      <Flex flexDirection="column">
        <GlobalStyle />
        <Header />
        <Flex flexDirection="row" width={1} px={2}>
          <Box flex={0.5}>
            <ListSidebar
              selectedList={selectedList}
              onSelectList={list =>
                this.setState({ selectedList: list, selectedTask: null })
              }
            />
          </Box>
          <Box flex={1} p={2} bg="#fff" borderRadius={6}>
            {selectedList ? (
              <ListDetail
                list={selectedList}
                selectedTask={selectedTask}
                onSelectTask={task => this.setState({ selectedTask: task })}
                onCreate={name => this.props.createTask(selectedList.id, name)}
                onDelete={this.props.deleteTask}
              />
            ) : null}
          </Box>
          <Box flex={1} ml={2} px={2} bg="#fff" borderRadius={6}>
            {selectedTask ? (
              <TaskDetail task={selectedTask} onDelete={this.deleteTask} />
            ) : null}
          </Box>
        </Flex>
      </Flex>
    );
  }
}

export default compose(
  graphql(Task.mutations.createTask, {
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
  graphql(Task.mutations.deleteTask, {
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
  graphql(Task.mutations.updateTask, {
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
