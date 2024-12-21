import { useEffect, useState } from "react";

/**
 * Creates a debounced version of a function that delays its execution
 * until after the specified wait time has elapsed since the last call.
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait = 0) {
  let timeoutId: NodeJS.Timeout | undefined;

  const debounced = (...args: Parameters<T>) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };

  // Add a cancel method in case we need to clean up
  debounced.cancel = () => {
    clearTimeout(timeoutId);
  };

  return debounced;
}

/**
 * React hook for debouncing values
 */
export function useDebounce<T>(value: T, wait = 0): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, wait);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, wait]);

  return debouncedValue;
}
