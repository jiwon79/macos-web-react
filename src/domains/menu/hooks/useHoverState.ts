import { useCallback, useState } from 'react';

export function useHoverState() {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
  }, [setHovered]);

  const handleMouseMove = useCallback(() => {
    setHovered(true);
  }, [setHovered]);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
  }, [setHovered]);

  return {
    hovered,
    targetProps: {
      onMouseEnter: handleMouseEnter,
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
  };
}
