import gql from "graphql-tag";
import { addToArray } from "../../lib";
import { taskDetailQuery } from "../Task/Detail";
import { CommentListItem } from "./List/Item";

export const createCommentMutation = gql`
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      task {
        id
      }
      ...CommentListItemFragment
    }
  }
  ${CommentListItem.fragment}
`;

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
