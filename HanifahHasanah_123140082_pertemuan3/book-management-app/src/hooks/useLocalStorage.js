import { useState, useEffect } from 'react';

// custom hook buat localStorage
const useLocalStorage = (keyName, defaultValue) => {
  
  // ambil data dari localStorage pas pertama kali
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(keyName);
      if (saved) {
        return JSON.parse(saved);
      }
      return defaultValue;
    } catch (err) {
      console.log('Error load data:', err);
      return defaultValue;
    }
  });

  // simpan ke localStorage setiap kali value berubah
  useEffect(() => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(value));
    } catch (err) {
      console.log('Error save data:', err);
    }
  }, [keyName, value]);

  return [value, setValue];
};

export default useLocalStorage;