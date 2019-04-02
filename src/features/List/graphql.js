import gql from "graphql-tag";
import { addToArray, removeFromArray } from "../../lib";
import { ListSidebar } from "./Sidebar";

const CommentFragment = gql`
  fragment CommentFields on Comment {
    id
    content
  }
`;

const TaskFragment = gql`
  fragment TaskFields on Task {
    id
    name
    completed
    createdAt
    updatedAt
    version
    list {
      id
    }
    comments {
      items {
        ...CommentFields
      }
    }
  }
  ${CommentFragment}
`;

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

export const listDetailQuery = gql`
  query getList(
    $id: ID!
    $filter: ModelTaskFilterInput
    $sortDirection: ModelSortDirection
    $limit: Int
    $nextToken: String
  ) {
    getList(id: $id) {
      id
      name
      createdAt
      updatedAt
      version
      tasks(
        filter: $filter
        sortDirection: $sortDirection
        limit: $limit
        nextToken: $nextToken
      ) {
        items {
          ...TaskFields
        }
        nextToken
      }
    }
  }
  ${TaskFragment}
`;

export const sidebarQuery = gql`
  query ListLists(
    $filter: ModelListFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        ...ListSidebarListFields
      }
      nextToken
    }
  }
  ${ListSidebar.listFragment}
`;

export const createListMutation = gql`
  mutation CreateList($input: CreateListInput!) {
    createList(input: $input) {
      ...ListSidebarListFields
    }
  }
  ${ListSidebar.listFragment}
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
    `
  },

  mutations: {
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
  let origList = client.readQuery({
    query: sidebarQuery,
    variables: ListSidebar.sidebarQueryDefaultVariables
  });
  let data = {
    listLists: {
      ...origList.listLists,
      items: addToArray(origList.listLists.items, createList)
    }
  };
  client.writeQuery({
    query: sidebarQuery,
    variables: ListSidebar.sidebarQueryDefaultVariables,
    data
  });
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
