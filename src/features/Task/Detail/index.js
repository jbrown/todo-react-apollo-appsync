import React from "react";
import { Mutation } from "react-apollo";
import { Box, Flex, QuickAdd } from "../../../components";
import { updateCreateComment } from "../../Comment/graphql";
import { Comment } from "../../Comment/graphql";
import CommentList from "../../Comment/List";

export const TaskDetail = ({ task }) => (
  <Flex flexDirection="column">
    <Box mb={2}>{task.name}</Box>
    <Box mb={2}>Comments ({task.comments.items.length})</Box>
    <CommentList comments={task.comments.items} />
    <Mutation
      mutation={Comment.mutations.createComment}
      update={(client, mutationResult) =>
        updateCreateComment(client, mutationResult, task.id)
      }
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
                  commentTaskId: task.id,
                  createdAt: "",
                  updatedAt: ""
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
  </Flex>
);
