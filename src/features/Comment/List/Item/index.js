import React from "react";
import gql from "graphql-tag";
import { formatDistance, parseISO } from "date-fns";
import { Box } from "jbrown-design-system";

export const CommentListItem = ({ content, createdAt }) => (
  <div>
    {content}
    <Box>{formatDistance(parseISO(createdAt), new Date())} ago</Box>
  </div>
);

CommentListItem.fragment = gql`
  fragment CommentListItemFragment on Comment {
    id
    content
    createdAt
  }
`;
