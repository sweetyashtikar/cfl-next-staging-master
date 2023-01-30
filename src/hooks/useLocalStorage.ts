import { useState } from 'react';

export default function useLocalStorage(
  key: string,
  initialValue: string | number | boolean
) {
  const [localStorageItem, setLocalStorageItem] = useState(() => {
    const item = localStorage[key];
    return item ? item : initialValue;
  });

  return [
    localStorageItem,
    (newVal: string | number | boolean) => {
      localStorage[key] = newVal;
      setLocalStorageItem(newVal);
    },
    () => {
      localStorage[key] = initialValue;
      setLocalStorageItem(initialValue);
    },
  ];
}
