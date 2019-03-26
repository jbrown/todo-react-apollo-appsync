import React from "react";
import { Box } from "pcln-design-system";
import { Link } from "react-router-dom";

export const Lists = props => {
  return (
    <Box>
      {props.lists.map(item => (
        <Box key={item.id}>
          <Link to={"/lists/" + item.id}>{item.name}</Link>
        </Box>
      ))}
    </Box>
  );
};
