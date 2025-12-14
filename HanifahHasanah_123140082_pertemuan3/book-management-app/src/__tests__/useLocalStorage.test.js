import { renderHook, act } from '@testing-library/react';
import useLocalStorage from '../hooks/useLocalStorage';

// test localStorage
test('localStorage hook bisa simpan dan load data', () => {
  const { result } = renderHook(() => useLocalStorage('testKey', 'defaultValue'));
  
  expect(result.current[0]).toBe('defaultValue');
  
  act(() => {
    result.current[1]('newValue');
  });
  
  expect(result.current[0]).toBe('newValue');
});