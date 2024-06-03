import { cn } from 'third-parties/classnames';
import { container } from './MenuBase.css';
import { forwardRef } from 'react';

export interface MenuBaseProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  type: 'apple-logo' | 'app-name' | 'item';
  className?: string;
  selected: boolean;
}

function _MenuBase(
  { children, type, className, selected, ...rest }: MenuBaseProps,
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <div
      ref={ref}
      className={cn(container({ selected, type }), className)}
      {...rest}
    >
      {children}
    </div>
  );
}

export const MenuBase = forwardRef(_MenuBase);
