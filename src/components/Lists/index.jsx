import React from "react";
import { Box } from "pcln-design-system";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { Query } from "react-apollo";

export const Lists = props => {
  return (
    <Query query={Lists.queries.listLists} fetchPolicy="cache-and-network">
      {({ data, loading, error }) => {
        if (error) {
          return "Error!";
        }

        if (loading && !data.listLists) {
          return "Loading...";
        }

        return (
          <Box>
            {data.listLists.items.map(item => (
              <Box key={item.id}>
                <Link to={"/lists/" + item.id}>{item.name}</Link>
              </Box>
            ))}
          </Box>
        );
      }}
    </Query>
  );
};

Lists.fragments = {
  list: gql`
    fragment ListFields on List {
      id
      name
      createdAt
      updatedAt
      version
    }
  `
};

Lists.queries = {
  listLists: gql`
    query ListLists(
      $filter: ModelListFilterInput
      $limit: Int
      $nextToken: String
    ) {
      listLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
        items {
          ...ListFields
        }
        nextToken
      }
    }
    ${Lists.fragments.list}
  `
};
