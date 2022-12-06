let lastCall = 0,
  lastCallTimer: any;
export function useDebounce(
  callback: (...args: any[]) => any,
  timeout: number
): (...args: unknown[]) => void {
  return (...args: unknown[]): void => {
    const previousCall = lastCall;
    lastCall = Date.now();

    if (previousCall && lastCall - previousCall <= timeout) {
      clearTimeout(lastCallTimer);
    }
    lastCallTimer = setTimeout(() => callback(...args), timeout);
  };
}
