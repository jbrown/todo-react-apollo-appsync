import React from "react";
import { OutlineButton } from "pcln-design-system";
import { Query, Mutation } from "react-apollo";
import { Box, Flex, QuickAdd } from "../../../components";
import {
  Lists,
  sidebarQuery,
  updateCreateList,
  updateDeleteList,
  updateListsFetchMore
} from "../graphql";
import ListSidebarItem from "./Item";

export const ListSidebar = ({ selectedList, onSelectList }) => {
  return (
    <Query
      query={sidebarQuery}
      fetchPolicy="cache-and-network"
      variables={{ limit: 100 }}
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
            <Mutation
              mutation={Lists.mutations.create}
              update={updateCreateList}
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
            <Box>
              <Mutation
                mutation={Lists.mutations.delete}
                update={updateDeleteList}
              >
                {deleteList =>
                  data.listLists.items.map(item => (
                    <ListSidebarItem
                      key={item.id}
                      {...item}
                      isSelected={!!selectedList && item.id === selectedList.id}
                      onClick={() => onSelectList(item)}
                    />
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
