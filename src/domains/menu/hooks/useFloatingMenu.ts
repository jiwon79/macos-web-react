import {
  offset,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
} from '@floating-ui/react';
import { useCallback, useState } from 'react';

export function useFloatingMenu({ focused }: { focused: boolean }) {
  const [open, setOpen] = useState(false);
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: 'bottom-start',
    middleware: [offset({ mainAxis: 2 })],
  });

  const hover = useHover(context, { enabled: focused });
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    dismiss,
  ]);

  const onOpenChange = useCallback((open: boolean) => setOpen(open), [setOpen]);

  return {
    refs,
    floating: {
      style: floatingStyles,
      ...getFloatingProps(),
    },
    reference: {
      ...getReferenceProps(),
    },
    open,
    onOpenChange,
  };
}
