import React from "react";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { Heading } from "pcln-design-system";
import { Flex } from "../index";
import { HeaderSocialLink } from "./SocialLink";

export const Header = ({ ...props }) => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      py={2}
      pl={3}
      pr={2}
      bg="darkBlue"
      {...props}
    >
      <Heading color="white">Todo</Heading>
      <Flex>
        <HeaderSocialLink
          url="https://www.linkedin.com/in/justinandrewbrown/"
          title="Contact me on Linkedin"
          icon={faLinkedin}
        />
        <HeaderSocialLink
          url="https://github.com/jbrown/todo-react-apollo-appsync"
          title="View Github Repository"
          icon={faGithub}
        />
      </Flex>
    </Flex>
  );
};
