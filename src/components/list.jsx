import React from "react";
import { Box, Flex } from "pcln-design-system";
import { compose, graphql } from "react-apollo";
import { graphqlMutation } from "aws-appsync-react";
import gql from "graphql-tag";
import { createTask, getList } from "../graphql";
import { QuickAddTask } from "./index";

export const List = compose(
  graphql(gql(getList), {
    options: props => ({
      fetchPolicy: "cache-and-network",
      variables: { id: props.match.params.id }
    }),
    props: props => ({
      list: props.data.getList ? props.data.getList : { tasks: { items: [] } }
    })
  }),
  graphqlMutation(gql(createTask), gql(getList), "Task")
)(props => (
  <Flex flexDirection="column">
    <QuickAddTask
      onSubmit={value =>
        props.createTask({
          input: {
            name: value,
            taskListId: props.list.id,
            completed: false
          }
        })
      }
    />
    <Box>
      {props.list.tasks.items.map(item => (
        <Box key={item.id}>{item.name}</Box>
      ))}
    </Box>
  </Flex>
));
