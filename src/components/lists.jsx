import React from "react";
import { Box } from "pcln-design-system";

export const Lists = props => {
  return (
    <Box>
      {props.lists.map(item => (
        <Box key={item.id}>{item.name}</Box>
      ))}
    </Box>
  );
};
