import React from "react";
import gql from "graphql-tag";
import { filter } from "graphql-anywhere";
import { Card } from "pcln-design-system";
import { CommentListItem } from "./Item";

export const CommentList = ({ comments: { items } }) => (
  <React.Fragment>
    {items.map(item => (
      <Card key={item.id} p={2} mb={2} borderRadius={4}>
        <CommentListItem {...filter(CommentListItem.fragment, item)} />
      </Card>
    ))}
  </React.Fragment>
);

CommentList.fragment = gql`
  fragment CommentListFragment on Task {
    comments(limit: 10) {
      items {
        ...CommentListItemFragment
      }
      nextToken
    }
  }
  ${CommentListItem.fragment}
`;
