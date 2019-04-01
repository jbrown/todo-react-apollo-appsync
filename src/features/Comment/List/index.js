import React from "react";
import { Card } from "pcln-design-system";
import CommentItem from "./Item";

export default ({ comments }) => (
  <React.Fragment>
    {comments.map(item => (
      <Card key={item.id} p={2} mb={2} borderRadius={4}>
        <CommentItem {...item} />
      </Card>
    ))}
  </React.Fragment>
);
