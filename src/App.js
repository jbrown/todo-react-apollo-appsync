import React, { Component } from "react";
import { Flex } from "pcln-design-system";
import { Box, Header, Lists } from "./components";
import { ListPage, TaskPage } from "./pages";

export default class App extends Component {
  state = {
    selectedList: null,
    selectedTask: null
  };

  render() {
    let { selectedList, selectedTask } = this.state;

    return (
      <Flex flexDirection="column">
        <Header />
        <Flex flexDirection="row" width={1}>
          <Box flex={0.5} px={2}>
            <Lists
              selectedList={selectedList}
              onSelectList={list => this.setState({ selectedList: list })}
            />
          </Box>
          <Box flex={1} px={2}>
            {selectedList ? (
              <ListPage
                list={selectedList}
                selectedTask={selectedTask}
                onSelectTask={task => this.setState({ selectedTask: task })}
              />
            ) : null}
          </Box>
          <Box flex={1} px={2}>
            {selectedTask ? <TaskPage task={selectedTask} /> : null}
          </Box>
        </Flex>
      </Flex>
    );
  }
}
