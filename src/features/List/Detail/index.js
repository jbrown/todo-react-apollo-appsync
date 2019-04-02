import React, { useState } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { IconButton, Text, ToggleBadge } from "pcln-design-system";
import { Box, Flex, QuickAdd } from "../../../components";
import { TaskList } from "../../Task/List";
import { listDetailQuery } from "../graphql";

export const ListDetail = ({
  onCreate,
  onCompleteSelected,
  onDeleteSelected,
  onUpdate,
  list,
  selectedTasks,
  onToggleSelectTask
}) => {
  const [viewingIncomplete, setViewingIncomplete] = useState(true);

  return (
    <Flex flexDirection="column">
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
          <Flex flexDirection="row" justifyContent="flex-end" px={1} mb={2}>
            <IconButton name="Check" onClick={onCompleteSelected} />
            <IconButton name="Close" onClick={onDeleteSelected} />
          </Flex>
          <QuickAdd placeholder="Add Task" onSubmit={onCreate} px={2} />
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

ListDetail.listFragment = gql`
  fragment ListDetailListFields on List {
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
