import React, { Component } from "react";
import { Box, Flex } from "pcln-design-system";
import { Header, Lists, List } from "./components";
import { BrowserRouter as Router, Route } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Flex flexDirection="column">
          <Header />

          <Flex flexDirection="row" width={1}>
            <Box width={1 / 4} px={2}>
              <Lists />
            </Box>
            <Box width={3 / 4} px="2">
              <Route path="/lists/:id" component={List} />
            </Box>
          </Flex>
        </Flex>
      </Router>
    );
  }
}
