import { useFloatingMenu } from 'domains/menu/hooks/useFloatingMenu';
import { ReactNode } from 'react';
import { FloatingMenuContent } from './FloatingMenuContent';
import { FloatingMenuContext } from './FloatingMenuContext';
import { FloatingMenuTrigger } from './FloatingMenuTrigger';

interface FloatingMenuProps {
  focused: boolean;
  selected: boolean;
  onSelectedChange: (selected: boolean) => void;
  children: ReactNode;
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

FloatingMenu.Trigger = FloatingMenuTrigger;
FloatingMenu.Content = FloatingMenuContent;
