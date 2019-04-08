import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Heading } from "pcln-design-system";
import { Flex } from "../index";

export const Header = ({ ...props }) => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      py={2}
      px={3}
      bg="darkBlue"
      {...props}
    >
      <Heading color="white">Todo</Heading>
      <a
        href="https://github.com/jbrown/todo-react-apollo-appsync"
        target="_blank"
        rel="noopener noreferrer"
        title="View Github Repository"
      >
        <FontAwesomeIcon icon={faGithub} color="white" size="lg" />
      </a>
    </Flex>
  );
};
