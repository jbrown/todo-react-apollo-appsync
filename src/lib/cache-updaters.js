export const addToArray = (arr, newItem) =>
  !newItem
    ? [...arr]
    : [...arr.filter(item => item.id !== newItem.id), newItem];
