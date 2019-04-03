import React from "react";
import { Heading } from "pcln-design-system";
import { Box } from "../index";

export const Header = ({ ...props }) => {
  return (
    <Box {...props} py={2} px={3} bg="darkBlue">
      <Heading color="white">Todo</Heading>
    </Box>
  );
};
