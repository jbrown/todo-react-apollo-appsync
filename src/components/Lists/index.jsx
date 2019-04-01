import React from "react";
import { OutlineButton, CloseButton, Text } from "pcln-design-system";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { addToArray, removeFromArray } from "../../lib";
import { List } from "../List";
import { Box, Flex, QuickAdd } from "../index";

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

const updateListsFetchMore = (previousResult, { fetchMoreResult }) => {
  let {
    listLists: { __typename, items: oldItems }
  } = previousResult;
  let {
    listLists: { items: newItems, nextToken }
  } = fetchMoreResult;

  return {
    listLists: {
      __typename,
      items: [...oldItems, ...newItems],
      nextToken
    }
  };
};

export const Lists = ({ selectedList, onSelectList }) => {
  return (
    <Query
      query={Lists.queries.listLists}
      fetchPolicy="cache-and-network"
      onCompleted={data => {
        if (!selectedList && data.listLists.items.length > 0) {
          onSelectList(data.listLists.items[0]);
        }
      }}
    >
      {({ data, loading, error, fetchMore }) => {
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
                    <Flex key={item.id} flexDirection="row">
                      <Box
                        flex={1}
                        bg={
                          !!selectedList && item.id === selectedList.id
                            ? "#fff6dd"
                            : null
                        }
                      >
                        <Text onClick={() => onSelectList(item)}>
                          {item.name}
                        </Text>
                      </Box>
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
                    </Flex>
                  ))
                }
              </Mutation>
              {data.listLists.nextToken ? (
                <OutlineButton
                  size="small"
                  onClick={() =>
                    fetchMore({
                      query: Lists.queries.listLists,
                      variables: { nextToken: data.listLists.nextToken },
                      updateQuery: updateListsFetchMore
                    })
                  }
                >
                  Fetch More {loading && "..."}
                </OutlineButton>
              ) : null}
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
