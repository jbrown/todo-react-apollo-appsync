import React from "react";
import { Box } from "../../../components";

const colorForPriority = {
  NO_PRIORITY: "borderGray",
  PRIORITY_ONE: "darkOrange",
  PRIORITY_TWO: "darkBlue",
  PRIORITY_THREE: "blue"
};

export const PriorityIndicator = ({ priority, ...props }) => (
  <Box
    {...props}
    alignSelf="stretch"
    bg={colorForPriority[priority]}
    style={{ width: "3px" }}
  />
);
