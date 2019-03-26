import React, { Component } from "react";
import { Box, Flex } from "pcln-design-system";
import { Header, Lists, List } from "./components";
import { compose, graphql } from "react-apollo";
import { listLists } from "./graphql";
import gql from "graphql-tag";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <Flex flexDirection="column">
          <Header />

          <Flex flexDirection="row" width={1}>
            <Box width={1 / 4} px={2}>
              <Lists lists={this.props.lists} />
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

export default compose(
  graphql(gql(listLists), {
    options: {
      fetchPolicy: "cache-and-network"
    },
    props: props => ({
      lists: props.data.listLists ? props.data.listLists.items : []
    })
  })
)(App);
