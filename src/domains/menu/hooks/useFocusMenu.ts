import { useCallback, useEffect, useRef, useState } from "react";

function useFocusMenu({
  onFocusChange: givenOnFocusChange
}: {
  onFocusChange?: (focused: boolean) => void;
} = {}) {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [focused, setFocused] = useState(false);

  const onFocusChange = useCallback(
    (focused: boolean) => {
      givenOnFocusChange?.(focused);
      setFocused(focused);
    },
    [givenOnFocusChange]
  );

  const handleMouseDown = useCallback(
    (event: MouseEvent) => {
      if (menuRef.current === null) {
        return;
      }

      if (menuRef.current.contains(event.target as Node)) {
        onFocusChange(!focused);
        return;
      }

      onFocusChange(false);
    },
    [focused, onFocusChange]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleMouseDown, true);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown, true);
    };
  }, [handleMouseDown]);

  return { focused, menuRef };
}

export default useFocusMenu;
