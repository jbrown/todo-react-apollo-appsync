import React from "react";
import { Badge } from "pcln-design-system";

const colors = ["lightBlue", "lightGreen", "lightRed", "lightOrange"];

export const TagList = ({ tags }) => (
  <React.Fragment>
    {tags.map((tag, ix) => (
      <Badge key={ix} bg={colors[ix % colors.length]} ml={1}>
        {tag}
      </Badge>
    ))}
  </React.Fragment>
);
