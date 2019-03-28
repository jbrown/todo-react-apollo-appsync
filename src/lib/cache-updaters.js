export const addToArray = (arr, newItem) =>
  !newItem
    ? [...arr]
    : [...arr.filter(item => item.id !== newItem.id), newItem];

export const removeFromArray = (arr, newItem) =>
  !newItem ? [] : arr.filter(item => item.id !== newItem.id);
