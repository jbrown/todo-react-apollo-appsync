import React from "react";
import { Mutation, Query } from "react-apollo";
import { Text } from "pcln-design-system";
import { Box, Flex, QuickAdd } from "../../../components";
import { updateCreateComment } from "../../Comment/graphql";
import { Comment } from "../../Comment/graphql";
import CommentList from "../../Comment/List";
import { PriorityIndicator } from "../index";
import { taskDetailQuery } from "../graphql";

export const TaskDetail = ({ taskId, priority, ...props }) => (
  <Flex {...props} flexDirection="column" p={2} bg="#fff" borderRadius={6}>
    <Query query={taskDetailQuery} variables={{ id: taskId }}>
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
              <PriorityIndicator priority={priority} />
              <Text fontSize={3} ml={1}>
                {task.name}
              </Text>
            </Flex>
            <Box mb={2}>Comments ({task.comments.items.length})</Box>
            <CommentList comments={task.comments.items} />
            <Mutation
              mutation={Comment.mutations.createComment}
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
