import { useEffect, useState } from 'react';
const PREFIX = 'codepen-clone-';

export default function useLocalStorage(key, initialValue) {
  const prefixedKey = PREFIX + key;

  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    console.log('Retrieving from localStorage:', prefixedKey, jsonValue);
    if (jsonValue != null) {
      try {
        return JSON.parse(jsonValue);
      } catch (error) {
        console.error("Error parsing localStorage item:", error);
        return initialValue;
      }
    }

    if (typeof initialValue === 'function') {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      console.log('Saving to localStorage:', prefixedKey, value);
      localStorage.setItem(prefixedKey, JSON.stringify(value));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [prefixedKey, value]);

  return [value, setValue];
}
