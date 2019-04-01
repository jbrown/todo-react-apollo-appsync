import React, { Component } from "react";
import { createGlobalStyle } from "styled-components";
import { Box, Flex, Header } from "./components";
import { ListPage, TaskPage } from "./pages";
import { ListSidebar } from "./features";

const GlobalStyle = createGlobalStyle`
  html, body {
    background-color: #eee;
  }
`;

export default class App extends Component {
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
        <Flex flexDirection="row" width={1}>
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
              <ListPage
                list={selectedList}
                selectedTask={selectedTask}
                onSelectTask={task => this.setState({ selectedTask: task })}
              />
            ) : null}
          </Box>
          <Box flex={1} px={2} bg="#fff" borderRadius={6}>
            {selectedTask ? <TaskPage task={selectedTask} /> : null}
          </Box>
        </Flex>
      </Flex>
    );
  }
}
