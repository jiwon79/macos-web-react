import { HTMLAttributes } from 'react';
import { useFloatingMenuContext } from './FloatingMenuContext';

interface FloatingMenuContentProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function FloatingMenuContent({
  children,
  style,
  ...rest
}: FloatingMenuContentProps) {
  const { floating, refs, selected, open } = useFloatingMenuContext();

  if (!selected && !open) {
    return null;
  }

  return (
    <div
      ref={refs.setFloating}
      {...floating}
      {...rest}
      style={{ ...floating.style, ...style }}
    >
      {children}
    </div>
  );
}
