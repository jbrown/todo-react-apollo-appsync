import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { addToArray } from "../../lib";
import { List, Task } from "../../components";

const updateCreateTask = (client, { data: { createTask } }, variables) => {
  let origList = client.readQuery({
    query: ListPage.queries.list,
    variables
  });
  let data = {
    getList: {
      ...origList.getList,
      tasks: {
        ...origList.getList.tasks,
        items: addToArray(origList.getList.tasks.items, createTask)
      }
    }
  };
  client.writeQuery({
    query: ListPage.queries.list,
    variables,
    data
  });
};

export const ListPage = props => (
  <Query
    fetchPolicy="cache-and-network"
    query={ListPage.queries.list}
    variables={{ id: props.match.params.id }}
  >
    {({ data, loading, error }) => {
      if (error) {
        return `Error: ${error}`;
      }
      if (loading && !data.getList) {
        return "Loading...";
      }
      return (
        <Mutation
          mutation={ListPage.mutations.createTask}
          update={(client, mutationResult) =>
            updateCreateTask(client, mutationResult, {
              id: props.match.params.id
            })
          }
        >
          {createTask => (
            <List
              list={data.getList}
              createTask={taskProps =>
                createTask({
                  variables: { input: taskProps },
                  optimisticResponse: {
                    __typename: "Mutation",
                    createTask: {
                      __typename: "Task",
                      ...taskProps,
                      id: "-1",
                      createdAt: "",
                      updatedAt: "",
                      version: 1
                    }
                  }
                })
              }
            />
          )}
        </Mutation>
      );
    }}
  </Query>
);

ListPage.queries = {
  list: gql`
    query GetList($id: ID!) {
      getList(id: $id) {
        ...ListFields
      }
    }
    ${List.fragments.list}
  `
};

ListPage.mutations = {
  createTask: gql`
    mutation CreateTask($input: CreateTaskInput!) {
      createTask(input: $input) {
        ...TaskFields
      }
    }
    ${Task.fragments.task}
  `
};
