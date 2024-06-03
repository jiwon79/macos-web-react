import { useFloatingMenu } from 'domains/menu/hooks/useFloatingMenu';
import {
  HTMLAttributes,
  cloneElement,
  createContext,
  useContext,
  useEffect,
} from 'react';
import { useHoverState } from 'domains/menu/hooks/useHoverState';

interface FloatingMenuProps {
  focused: boolean;
  selected: boolean;
  onSelectedChange: (selected: boolean) => void;
  children: React.ReactNode;
}

type FloatingMenuContext = {
  focused: boolean;
  selected: boolean;
  onSelectedChange: (selected: boolean) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  refs: {
    setReference: (element: HTMLElement | null) => void;
    setFloating: (element: HTMLElement | null) => void;
  };
  floating: HTMLAttributes<HTMLElement>;
  reference: HTMLAttributes<HTMLElement>;
} | null;

const FloatingMenuContext = createContext<FloatingMenuContext>(null);

function useFloatingMenuContext() {
  const context = useContext(FloatingMenuContext);
  if (context === null) {
    throw new Error('FloatingMenuContext must be used within a FloatingMenu');
  }

  return context;
}

export function FloatingMenu({
  focused,
  selected,
  onSelectedChange,
  children,
}: FloatingMenuProps) {
  const { refs, floating, reference, open, onOpenChange } = useFloatingMenu({
    focused,
  });
  const context = {
    focused,
    selected,
    onSelectedChange,
    open,
    onOpenChange,
    refs,
    floating,
    reference,
  };

  return (
    <FloatingMenuContext.Provider value={context}>
      {children}
    </FloatingMenuContext.Provider>
  );
}

interface FloatingMenuTriggerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactElement;
  type: 'app-name' | 'item';
}

export function FloatingMenuTrigger({
  children,
  type,
  ...rest
}: FloatingMenuTriggerProps) {
  const { onSelectedChange, refs, open, onOpenChange, reference, focused } =
    useFloatingMenuContext();

  const { hovered, targetProps } = useHoverState();

  useEffect(() => {
    if (focused && hovered) {
      onSelectedChange(true);
    }
  }, [focused, hovered]);

  return cloneElement(children, {
    ref: refs.setReference,
    onClick: () => onOpenChange(!open),
    ...reference,
    onMouseEnter: (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      targetProps.onMouseEnter();
      reference.onMouseEnter?.(e);
    },
    onMouseLeave: (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      targetProps.onMouseLeave();
      reference.onMouseLeave?.(e);
    },
    onMouseMove: (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      targetProps.onMouseMove();
      reference.onMouseMove?.(e);
    },
    ...rest,
  });
}

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

FloatingMenu.Trigger = FloatingMenuTrigger;
FloatingMenu.Content = FloatingMenuContent;
