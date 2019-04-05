import React from "react";
import gql from "graphql-tag";

export const CommentListItem = ({ content }) => <div>{content}</div>;

CommentListItem.fragment = gql`
  fragment CommentListItemFragment on Comment {
    id
    content
  }
`;
