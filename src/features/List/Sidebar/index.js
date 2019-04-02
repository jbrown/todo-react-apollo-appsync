import React, { useState } from "react";
import { IconButton, OutlineButton } from "pcln-design-system";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Box, Flex, QuickAdd } from "../../../components";
import {
  createListMutation,
  sidebarQuery,
  updateCreateList,
  updateListsFetchMore
} from "../graphql";
import ListSidebarItem from "./Item";

export const ListSidebar = ({ selectedList, onSelectList }) => {
  let [isShowingCreateForm, setIsShowingCreateForm] = useState(false);

  return (
    <Query
      query={sidebarQuery}
      fetchPolicy="cache-and-network"
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
          <Flex flexDirection="column">
            <Flex flexDirection="row" m={2}>
              <Box flex={1}>Lists ({data.listLists.items.length})</Box>
              <IconButton
                name={isShowingCreateForm ? "BoxMinus" : "BoxPlus"}
                size={24}
                color="black"
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
                  {...item}
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

ListSidebar.listFragment = gql`
  fragment ListSidebarListFields on List {
    id
    name
    version
    tasks(filter: { completed: { eq: false } }, limit: 10) {
      items {
        id
      }
    }
  }
`;

ListSidebar.sidebarQueryDefaultVariables = {
  limit: 40
};
