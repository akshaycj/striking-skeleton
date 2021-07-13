// FOR LOCAL API's if needed
const Storage = sessionStorage;

export const setStorageItem = async (key, value) => {
  Storage.setItem(key, value);
};

export const getStorageItem = async (key) => {
  const value = Storage.getItem(key);
  return value;
};

export const removeStorageItem = async (key) => {
  Storage.removeItem(key);
};
