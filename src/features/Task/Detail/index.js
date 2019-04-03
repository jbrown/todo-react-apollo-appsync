import React from "react";
import { Mutation, Query } from "react-apollo";
import { Box, Flex, QuickAdd } from "../../../components";
import { updateCreateComment } from "../../Comment/graphql";
import { Comment } from "../../Comment/graphql";
import CommentList from "../../Comment/List";
import { taskDetailQuery } from "../graphql";

export const TaskDetail = ({ taskId, ...props }) => (
  <Flex {...props} flexDirection="column" bg="#fff" borderRadius={6}>
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
            <Box mb={2}>{task.name}</Box>
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
