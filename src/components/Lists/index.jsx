import React from "react";
import { Box, CloseButton, Flex } from "pcln-design-system";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { addToArray, removeFromArray } from "../../lib";
import { List } from "../List";
import { QuickAdd } from "../index";

const updateCreateList = (client, { data: { createList } }) => {
  let origList = client.readQuery({ query: Lists.queries.listLists });
  let data = {
    listLists: {
      ...origList.listLists,
      items: addToArray(origList.listLists.items, createList)
    }
  };
  client.writeQuery({ query: Lists.queries.listLists, data });
};

const updateDeleteList = (client, { data: { deleteList } }) => {
  let origList = client.readQuery({ query: Lists.queries.listLists });
  let data = {
    listLists: {
      ...origList.listLists,
      items: removeFromArray(origList.listLists.items, deleteList)
    }
  };
  client.writeQuery({ query: Lists.queries.listLists, data });
};

export const Lists = props => {
  return (
    <Query query={Lists.queries.listLists} fetchPolicy="cache-and-network">
      {({ data, loading, error }) => {
        if (error) {
          return "Error!";
        }

        if (loading && !data.listLists) {
          return "Loading...";
        }

        return (
          <Flex flexDirection="column">
            <Mutation
              mutation={Lists.mutations.create}
              update={updateCreateList}
            >
              {(createList, { data, loading, error }) => (
                <QuickAdd
                  placeholder="Add List"
                  onSubmit={name =>
                    createList({
                      optimisticResponse: {
                        __typename: "Mutation",
                        createList: {
                          __typename: "List",
                          name,
                          id: "-1",
                          version: 1,
                          createdAt: "",
                          updatedAt: "",
                          tasks: {
                            __typename: "ModelTaskConnection",
                            items: []
                          }
                        }
                      },
                      variables: { input: { name } }
                    })
                  }
                />
              )}
            </Mutation>
            <Box>
              <Mutation
                mutation={Lists.mutations.delete}
                update={updateDeleteList}
              >
                {deleteList =>
                  data.listLists.items.map(item => (
                    <Box key={item.id}>
                      <Link to={"/lists/" + item.id}>{item.name}</Link>
                      <CloseButton
                        onClick={() =>
                          deleteList({
                            optimisticResponse: {
                              __typename: "Mutation",
                              deleteList: {
                                __typename: "List",
                                ...item
                              }
                            },
                            variables: {
                              input: {
                                id: item.id,
                                expectedVersion: item.version
                              }
                            }
                          })
                        }
                      />
                    </Box>
                  ))
                }
              </Mutation>
            </Box>
          </Flex>
        );
      }}
    </Query>
  );
};

Lists.queries = {
  listLists: gql`
    query ListLists(
      $filter: ModelListFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
        items {
          ...ListFields
        }
        nextToken
      }
    }
    ${List.fragments.list}
  `
};

Lists.mutations = {
  create: gql`
    mutation CreateList($input: CreateListInput!) {
      createList(input: $input) {
        ...ListFields
      }
    }
    ${List.fragments.list}
  `,
  delete: gql`
    mutation DeleteList($input: DeleteListInput!) {
      deleteList(input: $input) {
        ...ListFields
      }
    }
    ${List.fragments.list}
  `
};
