import React from "react";
import { Box, Flex } from "pcln-design-system";
import { compose, graphql } from "react-apollo";
import gql from "graphql-tag";
import { getList } from "../graphql";

export const List = compose(
  graphql(gql(getList), {
    options: props => ({
      fetchPolicy: "cache-and-network",
      variables: { id: props.match.params.id }
    })
  })
)(props => (
  <Flex>
    {props.data.getList.tasks.items.map(item => (
      <Box key={item.id}>{item.name}</Box>
    ))}
  </Flex>
));
