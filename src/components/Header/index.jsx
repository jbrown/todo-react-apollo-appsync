import React from "react";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { Heading } from "pcln-design-system";
import { Flex } from "jbrown-design-system";
import { Box } from "../index";
import { HeaderSocialLink } from "./SocialLink";
import GitHubButton from "react-github-btn";

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
      <Flex alignItems="center">
        <Box mb="-6px">
          {/* The Github iframe has some odd padding added. */}
          <GitHubButton
            href="https://github.com/jbrown/todo-react-apollo-appsync"
            data-icon="octicon-star"
            data-show-count="true"
            aria-label="Star jbrown/todo-react-apollo-appsync on GitHub"
          >
            Star
          </GitHubButton>
        </Box>
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
