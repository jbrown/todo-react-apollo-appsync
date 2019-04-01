import React, { useState } from "react";
import { Query } from "react-apollo";
import { ToggleBadge } from "pcln-design-system";
import { Box, Flex, QuickAdd } from "../../../components";
import TaskList from "../../Task/List";
import { listDetailQuery } from "../graphql";

export const ListDetail = ({
  onCreate,
  onDelete,
  onUpdate,
  list,
  selectedTask,
  onSelectTask
}) => {
  const [viewingIncomplete, setViewingIncomplete] = useState(true);

  return (
    <Flex flexDirection="column">
      <Flex flexDirection="row">
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
      <QuickAdd placeholder="Add Task" onSubmit={onCreate} />
      <Box>
        <Query
          query={listDetailQuery}
          variables={{
            id: list.id,
            filter: { completed: { eq: !viewingIncomplete } },
            limit: 30
          }}
        >
          {({ data: { getList }, loading, error }) => {
            if (error) {
              return `Error: ${error}`;
            }

            if (loading && !getList) {
              return "Loading...";
            }
            return (
              <React.Fragment>
                <TaskList
                  tasks={getList.tasks.items}
                  onSelectTask={onSelectTask}
                  selectedTask={selectedTask}
                  onDelete={onDelete}
                />
              </React.Fragment>
            );
          }}
        </Query>
      </Box>
    </Flex>
  );
};
