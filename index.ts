export const getLoc = (itemKey: string) => {
  return localStorage.getItem(itemKey);
};
export const setLoc = (itemKey: string, itemValue: any) => {
  return localStorage.setItem(itemKey, itemValue);
};
export const removeLoc = (itemKey: string) => {
  localStorage.removeItem(itemKey);
};

