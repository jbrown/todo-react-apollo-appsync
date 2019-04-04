import React from "react";
import { Card } from "pcln-design-system";
import { CommentListItem } from "./Item";

export default ({ comments }) => (
  <React.Fragment>
    {comments.map(item => (
      <Card key={item.id} p={2} mb={2} borderRadius={4}>
        <CommentListItem {...item} />
      </Card>
    ))}
  </React.Fragment>
);
