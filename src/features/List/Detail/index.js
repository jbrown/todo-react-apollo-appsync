import React, { useState } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { IconButton, Text, ToggleBadge } from "pcln-design-system";
import { Box, ButtonBar, Flex, QuickAdd } from "../../../components";
import { TaskList } from "../../Task/List";

export const ListDetail = ({
  onCreate,
  onCompleteSelected,
  onDeleteSelected,
  onUpdate,
  list,
  selectedTasks,
  onToggleSelectTask,
  ...props
}) => {
  const [viewingIncomplete, setViewingIncomplete] = useState(true);

  return (
    <Flex {...props} flexDirection="column" bg="#fff" borderRadius={6}>
      <Flex flexDirection="row" p={1}>
        <ToggleBadge
          selected={viewingIncomplete}
          onClick={() => setViewingIncomplete(true)}
        >
          Incomplete
        </ToggleBadge>
        <ToggleBadge
          selected={!viewingIncomplete}
          onClick={() => setViewingIncomplete(false)}
        >
          Completed
        </ToggleBadge>
      </Flex>
      {viewingIncomplete ? (
        <React.Fragment>
          <ButtonBar mb={2} mx={2} width={0.2}>
            <ButtonBar.Button onClick={onCompleteSelected}>
              <IconButton name="Check" color="gray" />
            </ButtonBar.Button>
            <ButtonBar.Button onClick={onDeleteSelected}>
              <IconButton name="Close" color="gray" />
            </ButtonBar.Button>
          </ButtonBar>
          <QuickAdd placeholder="Add Task" onSubmit={onCreate} mx={2} mb={2} />
        </React.Fragment>
      ) : null}

      <Box>
        <Query
          query={listDetailQuery}
          variables={{
            ...ListDetail.listDetailQueryDefaultVariables,
            id: list.id,
            filter: { completed: { eq: !viewingIncomplete } }
          }}
        >
          {({ data: { getList }, loading, error }) => {
            if (error) {
              return `Error: ${error}`;
            }

            if (loading && !getList) {
              return "Loading...";
            }

            if (getList.tasks.items.length === 0) {
              return (
                <Flex flexDirection="column" mt={6}>
                  <Text mx="auto" color="gray">
                    No {viewingIncomplete ? "incomplete" : "completed"} tasks
                  </Text>
                </Flex>
              );
            }

            return (
              <TaskList
                tasks={getList.tasks.items}
                onToggleSelectTask={onToggleSelectTask}
                selectedTasks={selectedTasks}
              />
            );
          }}
        </Query>
      </Box>
    </Flex>
  );
};

ListDetail.fragment = gql`
  fragment ListDetailFragment on List {
    id
    name
    createdAt
    updatedAt
    version
    tasks(
      filter: $filter
      sortDirection: $sortDirection
      limit: $limit
      nextToken: $nextToken
    ) {
      ...TaskListFragment
    }
  }
  ${TaskList.fragment}
`;

ListDetail.listDetailQueryDefaultVariables = {
  limit: 30
};

export const listDetailQuery = gql`
  query getList(
    $id: ID!
    $filter: ModelTaskFilterInput
    $sortDirection: ModelSortDirection
    $limit: Int
    $nextToken: String
  ) {
    getList(id: $id) {
      ...ListDetailFragment
    }
  }
  ${ListDetail.fragment}
`;
