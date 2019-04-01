import gql from "graphql-tag";
import { addToArray, removeFromArray } from "../../lib";
import { TaskFragment } from "../Task/graphql";

export const ListFragment = gql`
  fragment ListFields on List {
    id
    name
    createdAt
    updatedAt
    version
    tasks {
      items {
        ...TaskFields
      }
    }
  }
  ${TaskFragment}
`;

export const Lists = {
  queries: {
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
      ${ListFragment}
    `,
    list: gql`
      query GetList($id: ID!) {
        getList(id: $id) {
          ...ListFields
        }
      }
      ${ListFragment}
    `
  },

  mutations: {
    create: gql`
      mutation CreateList($input: CreateListInput!) {
        createList(input: $input) {
          ...ListFields
        }
      }
      ${ListFragment}
    `,
    delete: gql`
      mutation DeleteList($input: DeleteListInput!) {
        deleteList(input: $input) {
          ...ListFields
        }
      }
      ${ListFragment}
    `
  }
};

export const updateCreateList = (client, { data: { createList } }) => {
  let origList = client.readQuery({ query: Lists.queries.listLists });
  let data = {
    listLists: {
      ...origList.listLists,
      items: addToArray(origList.listLists.items, createList)
    }
  };
  client.writeQuery({ query: Lists.queries.listLists, data });
};

export const updateDeleteList = (client, { data: { deleteList } }) => {
  let origList = client.readQuery({ query: Lists.queries.listLists });
  let data = {
    listLists: {
      ...origList.listLists,
      items: removeFromArray(origList.listLists.items, deleteList)
    }
  };
  client.writeQuery({ query: Lists.queries.listLists, data });
};

export const updateListsFetchMore = (previousResult, { fetchMoreResult }) => {
  let {
    listLists: { __typename, items: oldItems }
  } = previousResult;
  let {
    listLists: { items: newItems, nextToken }
  } = fetchMoreResult;

  return {
    listLists: {
      __typename,
      items: [...oldItems, ...newItems],
      nextToken
    }
  };
};
