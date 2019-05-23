import React, { useState } from "react";
import { IconButton } from "pcln-design-system";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { filter } from "graphql-anywhere";
import { QuickAdd } from "../../../components";
import { Box, Flex, OutlineButton } from "jbrown-design-system";
import { updateCreateList, updateListsFetchMore } from "../graphql";
import { ListSidebarItem } from "./Item";

export const ListSidebar = ({ selectedList, onSelectList, ...props }) => {
  let [isShowingCreateForm, setIsShowingCreateForm] = useState(false);

  return (
    <Query
      query={sidebarQuery}
      fetchPolicy="network-only"
      variables={{ ...ListSidebar.sidebarQueryDefaultVariables }}
      onCompleted={data => {
        if (!selectedList && data.listLists.items.length > 0) {
          onSelectList(data.listLists.items[0]);
        }
      }}
    >
      {({ data, loading, error, fetchMore }) => {
        if (error) {
          return `Error: ${error}`;
        }

        if (loading && !data.listLists) {
          return "Loading...";
        }

        return (
          <Flex {...props} flexDirection="column">
            <Flex flexDirection="row" m={2}>
              <Box flex={1}>Lists ({data.listLists.items.length})</Box>
              <IconButton
                name={isShowingCreateForm ? "BoxMinus" : "BoxPlus"}
                size={24}
                color="black"
                data-test-id="new-list-btn"
                onClick={() => setIsShowingCreateForm(!isShowingCreateForm)}
              />
            </Flex>
            {isShowingCreateForm ? (
              <Mutation
                mutation={createListMutation}
                update={updateCreateList}
                onCompleted={() => setIsShowingCreateForm(false)}
              >
                {(createList, { data, loading, error }) => (
                  <QuickAdd
                    mb={2}
                    mr={2}
                    placeholder="Add List"
                    data-test-id="new-list-form"
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
            ) : null}
            <Box>
              {data.listLists.items.map(item => (
                <ListSidebarItem
                  key={item.id}
                  {...filter(ListSidebarItem.fragment, item)}
                  isSelected={!!selectedList && item.id === selectedList.id}
                  onClick={() => onSelectList(item)}
                />
              ))}
              {data.listLists.nextToken ? (
                <OutlineButton
                  size="small"
                  onClick={() =>
                    fetchMore({
                      query: sidebarQuery,
                      variables: {
                        ...ListSidebar.sidebarQueryDefaultVariables,
                        nextToken: data.listLists.nextToken
                      },
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

ListSidebar.fragment = gql`
  fragment ListSidebarFragment on ModelListConnection {
    items {
      ...ListSidebarItemFragment
    }
    nextToken
  }
  ${ListSidebarItem.fragment}
`;

ListSidebar.sidebarQueryDefaultVariables = {
  limit: 40
};

export const sidebarQuery = gql`
  query ListLists(
    $filter: ModelListFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      ...ListSidebarFragment
    }
  }
  ${ListSidebar.fragment}
`;

export const createListMutation = gql`
  mutation CreateList($input: CreateListInput!) {
    createList(input: $input) {
      ...ListSidebarItemFragment
    }
  }
  ${ListSidebarItem.fragment}
`;

export const deleteListMutation = gql`
  mutation DeleteList($input: DeleteListInput!) {
    deleteList(input: $input) {
      ...ListSidebarItemFragment
    }
  }
  ${ListSidebarItem.fragment}
`;
