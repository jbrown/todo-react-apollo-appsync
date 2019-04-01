import gql from "graphql-tag";
import { TaskFragment } from "../Task/graphql";
import { addToArray } from "../../lib";

export const CommentFragment = gql`
  fragment CommentFields on Comment {
    id
    content
  }
`;

export const Comment = {
  mutations: {
    createComment: gql`
      mutation CreateComment($input: CreateCommentInput!) {
        createComment(input: $input) {
          ...CommentFields
        }
      }
      ${CommentFragment}
    `
  }
};

export const updateCreateComment = (
  client,
  { data: { createComment } },
  taskId
) => {
  let task = client.readFragment({
    id: `Task:${taskId}`,
    fragment: TaskFragment,
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
    fragment: TaskFragment,
    fragmentName: "TaskFields",
    data
  });
};
