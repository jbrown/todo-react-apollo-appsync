import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box } from "../../index";

export const HeaderSocialLink = ({ url, icon, title }) => (
  <Box pl={2}>
    <a href={url} target="_blank" rel="noopener noreferrer" title={title}>
      <FontAwesomeIcon icon={icon} color="white" size="lg" />
    </a>
  </Box>
);
