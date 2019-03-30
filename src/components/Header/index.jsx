import React from "react";
import { Heading } from "pcln-design-system";
import { Box } from "../index";

export const Header = () => {
  return (
    <Box py={2} px={2} mb={2} bg="darkBlue">
      <Heading color="white">Todo</Heading>
    </Box>
  );
};
