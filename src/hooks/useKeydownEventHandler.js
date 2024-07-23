import { useEffect } from "react";

export function useKeydownEventHandler(key, action) {
  useEffect(() => {
    function handler(event) {
      if (event.code === key) {
        action();
      }
    }

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [key, action]);
}
