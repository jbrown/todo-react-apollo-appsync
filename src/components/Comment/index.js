import React from "react";
import gql from "graphql-tag";

export const Comment = ({ content }) => <div>{content}</div>;

Comment.fragments = {
  comment: gql`
    fragment CommentFields on Comment {
      id
      content
    }
  `
};
