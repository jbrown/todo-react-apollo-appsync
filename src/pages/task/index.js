import React from "react";
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import { Box, Flex } from "pcln-design-system";
import { Comment, QuickAdd, Task } from "../../components";
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

export const TaskPage = ({ match }) => (
  <Query query={TaskPage.queries.getTask} variables={{ id: match.params.id }}>
    {({ data: { getTask: task }, loading, error }) => {
      if (error) {
        return `Error: ${error}`;
      }

      if (loading && !task) {
        return "Loading...";
      }

      return (
        <Flex flexDirection="column">
          <Box>{task.name}</Box>
          <Box>Comments ({task.comments.items.length})</Box>
          <Box>
            {task.comments.items.map(item => (
              <Comment key={item.id} {...item} />
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
    }}
  </Query>
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
