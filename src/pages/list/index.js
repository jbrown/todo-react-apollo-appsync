import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { List } from "../../components";

export const ListPage = props => (
  <Query
    fetchPolicy="cache-and-network"
    query={ListPage.queries.list}
    variables={{ id: props.match.params.id }}
  >
    {({ data, loading, error }) => {
      if (error) {
        return `Error: ${error}`;
      }
      if (loading && !data.getList) {
        return "Loading...";
      }
      return <List list={data.getList} />;
    }}
  </Query>
);

ListPage.queries = {
  list: gql`
    query GetList($id: ID!) {
      getList(id: $id) {
        ...ListFields
      }
    }
    ${List.fragments.list}
  `
};
