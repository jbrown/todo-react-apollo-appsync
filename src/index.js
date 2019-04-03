import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { ThemeProvider } from "pcln-design-system";
import { createGlobalStyle } from "styled-components";
import { normalize } from "polished";

import Client from "aws-appsync";
import { ApolloProvider } from "react-apollo";
import { Rehydrated } from "aws-appsync-react";
import awsConfig from "./aws-exports";

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
        <ThemeProvider className="theme-provider-hoc">
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
