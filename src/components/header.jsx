import React from "react";
import { Box, Container, Heading } from "pcln-design-system";

export const Header = () => {
  return (
    <Box bg="purple">
      <Container maxWidth={800}>
        <Box py={1}>
          <Heading color="white">Todo</Heading>
        </Box>
      </Container>
    </Box>
  );
};
