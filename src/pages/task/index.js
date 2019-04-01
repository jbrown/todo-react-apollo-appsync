import React from "react";
import { Mutation } from "react-apollo";
import { Card } from "pcln-design-system";
import { Box, Comment as CommentItem, Flex, QuickAdd } from "../../components";
import { updateCreateComment } from "../../features/Comment/graphql";
import { Comment } from "../../features/Comment/graphql";

export const TaskPage = ({ task }) => (
  <Flex flexDirection="column">
    <Box mb={2}>{task.name}</Box>
    <Box mb={2}>Comments ({task.comments.items.length})</Box>
    <Box>
      {task.comments.items.map(item => (
        <Card key={item.id} p={2} mb={2} borderRadius={4}>
          <CommentItem {...item} />
        </Card>
      ))}
    </Box>
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
