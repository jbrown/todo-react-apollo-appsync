import React from "react";
import gql from "graphql-tag";
import { Card } from "pcln-design-system";
import { CommentListItem } from "./Item";

export const CommentList = ({ comments }) => (
  <React.Fragment>
    {comments.map(item => (
      <Card key={item.id} p={2} mb={2} borderRadius={4}>
        <CommentListItem {...item} />
      </Card>
    ))}
  </React.Fragment>
);

CommentList.fragment = gql`
  fragment CommentListFragment on ModelCommentConnection {
    items {
      ...CommentListItemFragment
    }
    nextToken
  }
  ${CommentListItem.fragment}
`;
