import { cn } from 'third-parties/classnames';
import { container } from './MenuBase.css';
import { useState } from 'react';

export interface MenuBaseProps {
  children: React.ReactNode;
  selected?: boolean;
  selectOnHover?: boolean;
  className?: string;
}

export function MenuBase({
  children,
  className,
  selected: givenSelected = false,
  selectOnHover = false,
}: MenuBaseProps) {
  const [isHovered, setIsHovered] = useState(false);

  const onMouseEnter = () => {
    if (selectOnHover) {
      setIsHovered(true);
    }
  };

  const onMouseLeave = () => {
    if (selectOnHover) {
      setIsHovered(false);
    }
  };

  const selected = givenSelected || (selectOnHover && isHovered);

  return (
    <div
      className={cn(container({ selected }), className)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}
