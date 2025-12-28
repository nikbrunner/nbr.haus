import { useEffect } from "react";

/**
 * Hook that runs a callback once when the component mounts.
 * @param callback - Function to run on mount
 */
export function useOnMount(callback: () => void | (() => void)) {
  useEffect(() => {
    return callback();
  }, []);
}
