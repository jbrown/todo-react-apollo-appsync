import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Card } from "pcln-design-system";
import { Box, Comment, Flex, QuickAdd, Task } from "../../components";
import { addToArray } from "../../lib";

const updateCreateComment = (client, { data: { createComment } }, taskId) => {
  let task = client.readFragment({
    id: `Task:${taskId}`,
    fragment: Task.fragments.task,
    fragmentName: "TaskFields"
  });
  let data = {
    ...task,
    comments: {
      ...task.comments,
      items: addToArray(task.comments.items, createComment)
    }
  };
  client.writeFragment({
    id: `Task:${taskId}`,
    fragment: Task.fragments.task,
    fragmentName: "TaskFields",
    data
  });
};

export const TaskPage = ({ task }) => (
  <Flex flexDirection="column">
    <Box mb={2}>{task.name}</Box>
    <Box mb={2}>Comments ({task.comments.items.length})</Box>
    <Box>
      {task.comments.items.map(item => (
        <Card key={item.id} p={2} mb={2} borderRadius={4}>
          <Comment {...item} />
        </Card>
      ))}
    </Box>
    <Mutation
      mutation={TaskPage.mutations.createComment}
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

TaskPage.queries = {
  getTask: gql`
    query GetTask($id: ID!) {
      getTask(id: $id) {
        ...TaskFields
      }
    }
    ${Task.fragments.task}
  `
};

TaskPage.mutations = {
  createComment: gql`
    mutation CreateComment($input: CreateCommentInput!) {
      createComment(input: $input) {
        ...CommentFields
      }
    }
    ${Comment.fragments.comment}
  `
};
