import { useHoverState } from 'domains/menu/hooks/useHoverState';
import { HTMLAttributes, ReactNode, useEffect } from 'react';
import { useFloatingMenuContext } from './FloatingMenuContext';
import { MenuBase, MenuType } from '../menu-base';

interface FloatingMenuTriggerProps extends HTMLAttributes<HTMLDivElement> {
  type: MenuType;
  children: ReactNode;
}

export function FloatingMenuTrigger({
  type,
  children,
  ...rest
}: FloatingMenuTriggerProps) {
  const {
    onSelectedChange,
    refs,
    open,
    onOpenChange,
    reference,
    focused,
    selected,
  } = useFloatingMenuContext();

  const { hovered, targetProps } = useHoverState();

  useEffect(() => {
    if (focused && hovered) {
      onSelectedChange(true);
    }
  }, [focused, hovered]);

  return (
    <MenuBase
      ref={refs.setReference}
      type={type}
      selected={selected}
      onClick={(event) => {
        onOpenChange(!open);
        rest.onClick?.(event);
      }}
      {...reference}
      onMouseEnter={(event) => {
        targetProps.onMouseEnter();
        reference.onMouseEnter?.(event);
        rest.onMouseEnter?.(event);
      }}
      onMouseLeave={(event) => {
        targetProps.onMouseLeave();
        reference.onMouseLeave?.(event);
        rest.onMouseLeave?.(event);
        rest.onMouseLeave?.(event);
      }}
      onMouseMove={(event) => {
        targetProps.onMouseMove();
        reference.onMouseMove?.(event);
        rest.onMouseMove?.(event);
      }}
      {...rest}
    >
      {children}
    </MenuBase>
  );
}
