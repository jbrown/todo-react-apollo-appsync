import { addToArray, removeFromArray } from "../../lib";
import { ListSidebar, sidebarQuery } from "./index";

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
  let origList = client.readQuery({
    query: sidebarQuery,
    variables: ListSidebar.sidebarQueryDefaultVariables
  });
  let data = {
    listLists: {
      ...origList.listLists,
      items: removeFromArray(origList.listLists.items, deleteList)
    }
  };
  client.writeQuery({
    query: sidebarQuery,
    variables: ListSidebar.sidebarQueryDefaultVariables,
    data
  });
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
