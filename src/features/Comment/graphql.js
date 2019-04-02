import gql from "graphql-tag";
import { addToArray } from "../../lib";
import { taskDetailQuery } from "../Task/graphql";

export const CommentFragment = gql`
  fragment CommentFields on Comment {
    id
    content
    version
    task {
      id
    }
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

export const updateCreateComment = (client, { data: { createComment } }) => {
  let detail = client.readQuery({
    query: taskDetailQuery,
    variables: {
      id: createComment.task.id
    }
  });
  client.writeQuery({
    query: taskDetailQuery,
    variables: {
      id: createComment.task.id
    },
    data: {
      getTask: {
        ...detail.getTask,
        comments: {
          ...detail.getTask.comments,
          items: addToArray(detail.getTask.comments.items, createComment)
        }
      }
    }
  });
};
