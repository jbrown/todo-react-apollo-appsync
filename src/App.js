import React, { Component } from "react";
import { Flex } from "pcln-design-system";
import { Box, Header, Lists } from "./components";
import { ListPage, TaskPage } from "./pages";
import { BrowserRouter as Router, Route } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Flex flexDirection="column">
          <Header />
          <Flex flexDirection="row" width={1}>
            <Box flex={0.5} px={2}>
              <Lists />
            </Box>
            <Box flex={1} px={2}>
              <Route path="/lists/:id" component={ListPage} />
              <Route path="/tasks/:id" component={TaskPage} />
            </Box>
            <Box flex={1} px={2} />
          </Flex>
        </Flex>
      </Router>
    );
  }
}
