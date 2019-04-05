import React from "react";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import { OutlineButton, Text } from "pcln-design-system";
import { Box, Flex, QuickAdd } from "../../../components";
import { updateCreateComment } from "../../Comment/graphql";
import { createCommentMutation } from "../../Comment/graphql";
import { CommentList } from "../../Comment/List";
import { PriorityIndicator, TagList } from "../index";

export const taskDetailQuery = gql`
  query GetTask($id: ID!) {
    getTask(id: $id) {
      id
      name
      completed
      priority
      tags
      version
      list {
        id
        name
      }
      comments(limit: 10) {
        ...CommentListFragment
      }
    }
  }
  ${CommentList.fragment}
`;

export const TaskDetail = ({ selectedTasks, onClearSelection, ...props }) => {
  if (selectedTasks.length === 0) {
    return null;
  } else if (selectedTasks.length > 1) {
    return (
      <Flex
        {...props}
        flexDirection="column"
        p={2}
        bg="#fff"
        borderRadius={6}
        justifyContent="center"
        alignItems="center"
      >
        {selectedTasks.length} tasks selected.{" "}
        <OutlineButton mt={2} onClick={onClearSelection}>
          Clear Selection
        </OutlineButton>
      </Flex>
    );
  } else {
    return (
      <Flex {...props} flexDirection="column" p={2} bg="#fff" borderRadius={6}>
        <Query query={taskDetailQuery} variables={{ id: selectedTasks[0].id }}>
          {({ data: { getTask: task }, loading, error }) => {
            if (error) {
              return `Error: ${error}`;
            }

            if (loading && !task) {
              return "Loading...";
            }

            return (
              <React.Fragment>
                <Flex mb={2}>
                  <PriorityIndicator priority={task.priority} />
                  <Text fontSize={3} ml={1}>
                    {task.name}
                  </Text>
                </Flex>
                <Flex mb={1}>
                  <Box flex={0.2}>Tags:</Box>
                  <Box flex={1}>
                    {task.tags.length > 0 ? (
                      <TagList tags={task.tags} />
                    ) : (
                      "none"
                    )}
                  </Box>
                </Flex>
                <Flex>
                  <Box flex={0.2}>List:</Box>
                  <Box flex={1}>{task.list.name}</Box>
                </Flex>
                <Box mb={1} mt={3}>
                  Comments ({task.comments.items.length})
                </Box>
                <CommentList comments={task.comments.items} />
                <Mutation
                  mutation={createCommentMutation}
                  update={updateCreateComment}
                >
                  {createComment => (
                    <QuickAdd
                      placeholder="Add Comment"
                      onSubmit={value =>
                        createComment({
                          optimisticResponse: {
                            __typename: "Mutation",
                            createComment: {
                              __typename: "Comment",
                              id: "-1",
                              content: value,
                              task: {
                                __typename: "Task",
                                id: task.id
                              },
                              createdAt: "",
                              updatedAt: "",
                              version: 1
                            }
                          },
                          variables: {
                            input: { content: value, commentTaskId: task.id }
                          }
                        })
                      }
                    />
                  )}
                </Mutation>
              </React.Fragment>
            );
          }}
        </Query>
      </Flex>
    );
  }
};
