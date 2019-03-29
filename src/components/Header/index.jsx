import React from "react";
import { Box, Heading } from "pcln-design-system";

export const Header = () => {
  return (
    <Box py={2} px={2} mb={2} bg="darkBlue">
      <Heading color="white">Todo</Heading>
    </Box>
  );
};
