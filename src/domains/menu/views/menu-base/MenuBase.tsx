import { cn } from 'third-parties/classnames';
import { container } from './MenuBase.css';
import { forwardRef, useEffect } from 'react';
import { useHoverState } from 'domains/menu/hooks/useHoverState';

export interface MenuBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  name: string;
  focused?: boolean;
  className?: string;
  selected: boolean;
  onSelectedChange: (selected: boolean) => void;
}

function _MenuBase(
  {
    children,
    className,
    name,
    focused = false,
    selected,
    onSelectedChange,
    ...rest
  }: MenuBaseProps,
  ref: React.Ref<HTMLDivElement>
) {
  const { hovered, targetProps } = useHoverState();

  useEffect(() => {
    if (focused && hovered) {
      onSelectedChange(true);
    }
  }, [focused, hovered]);

  return (
    <div
      ref={ref}
      className={cn(container({ selected }), className)}
      {...rest}
      {...targetProps}
    >
      {children}
    </div>
  );
}

export const MenuBase = forwardRef(_MenuBase);
