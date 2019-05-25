import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { Hub } from "aws-amplify";
import ReactGA from "react-ga";
import { theme } from "jbrown-design-system";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { normalize } from "polished";

import Client from "aws-appsync";
import { ApolloProvider } from "react-apollo";
import { Rehydrated } from "aws-appsync-react";
import awsConfig from "./aws-exports";

ReactGA.initialize("UA-137863139-1");

Hub.listen("ga", data => {
  if (process.env.REACT_APP_ENVIRONMENT === "prod") {
    ReactGA.pageview(`/${data.payload.event}/${data.payload.data.name}`);
  }
});

const client = new Client({
  url: awsConfig.aws_appsync_graphqlEndpoint,
  region: awsConfig.aws_appsync_region,
  auth: {
    type: awsConfig.aws_appsync_authenticationType,
    apiKey: awsConfig.aws_appsync_apiKey
  }
});

const GlobalStyle = createGlobalStyle`
  ${normalize()}

  * {
    font-family: ${props => props.theme.font};
    line-height: ${props => props.theme.lineHeights.standard};
    font-weight: ${props => props.theme.fontWeights.medium};
  }

  html,
  body,
  #root,
  .awsappsync,
  .theme-provider-hoc {
    background-color: #eee;
    height: 100%;
    overscroll-behavior: none;
  }

  .main-container {
    height: 100vh;
  }
`;

const WithProvider = () => {
  return (
    <ApolloProvider client={client}>
      <Rehydrated>
        <ThemeProvider theme={theme} className="theme-provider-hoc">
          <React.Fragment>
            <GlobalStyle />
            <App />
          </React.Fragment>
        </ThemeProvider>
      </Rehydrated>
    </ApolloProvider>
  );
};

ReactDOM.render(<WithProvider />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
