import { forwardRef } from 'react';

interface FloatingMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function _FloatingMenu(
  { children, ...rest }: FloatingMenuProps,
  ref: React.Ref<HTMLDivElement>
) {
  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
}

export const FloatingMenu = forwardRef(_FloatingMenu);
