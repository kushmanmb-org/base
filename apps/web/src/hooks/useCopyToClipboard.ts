import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Hook for handling copy-to-clipboard functionality with temporary feedback state
 * @param timeout - Time in milliseconds before the copied state resets (default: 2000ms)
 * @returns Object with `hasCopied` state and `copyToClipboard` function
 */
export function useCopyToClipboard(timeout = 2000) {
  const [hasCopied, setHasCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const copyToClipboard = useCallback(
    (text: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      void navigator.clipboard.writeText(text);
      setHasCopied(true);

      timeoutRef.current = setTimeout(() => {
        setHasCopied(false);
        timeoutRef.current = null;
      }, timeout);
    },
    [timeout],
  );

  return { hasCopied, copyToClipboard };
}
