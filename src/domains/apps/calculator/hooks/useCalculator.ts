import { useRef, useState } from 'react';

export function useCalculator() {
  const [display, setDisplay] = useState<string>('0');
  const lastOperator = useRef<string | null>(null);
  const isOperatorClicked = useRef<boolean>(false);
  const lastValue = useRef<number | null>(null);
  const currentValue = useRef<number | null>(null);
  const lastOperatorFunction = useRef<((num: number) => number) | null>(null);

  const onNumberClick = (num: string) => {
    if (display === '0' || isOperatorClicked.current) {
      setDisplay(num);
      isOperatorClicked.current = false;
      return;
    }

    isOperatorClicked.current = false;
    if (display === '0') {
      setDisplay(num);
      return;
    }
    setDisplay(display + num);
  };

  const onDotClick = () => {
    if (isOperatorClicked.current) {
      setDisplay('0.');
      isOperatorClicked.current = false;
      return;
    }

    isOperatorClicked.current = false;
    if (display.includes('.')) {
      return;
    }
    setDisplay(display + '.');
  };

  const onClearClick = () => {
    isOperatorClicked.current = false;
    lastValue.current = null;
    lastOperator.current = null;
    lastOperatorFunction.current = null;
    setDisplay('0');
  };

  const onPlusMinusClick = () => {
    const parsedDisplay = parseDisplayStr(display);
    setDisplay((parsedDisplay * -1).toString());
  };

  const onPlustClick = () => {
    isOperatorClicked.current = true;
    lastOperatorFunction.current = null;
    const parsedDisplay = parseDisplayStr(display);
    lastValue.current = parsedDisplay;
    lastOperator.current = '+';
  };

  const onEqualClick = () => {
    const parsedDisplay = parseDisplayStr(display);
    if (lastValue.current === null) {
      lastValue.current = parsedDisplay;
      return;
    }

    if (lastOperatorFunction.current) {
      setDisplay(lastOperatorFunction.current(parsedDisplay).toString());
      return;
    }

    if (lastOperator.current === '+') {
      lastOperatorFunction.current = (num: number) => num + parsedDisplay;
      setDisplay((lastValue.current + parsedDisplay).toString());
    }
  };

  return {
    display,
    onNumberClick,
    onDotClick,
    onClearClick,
    onPlusMinusClick,
    onPlustClick,
    onMinusClick: () => {},
    onMultiplyClick: () => {},
    onDivideClick: () => {},
    onPercentClick: () => {},
    onEqualClick,
  };
}

function parseDisplayStr(displayStr: string) {
  if (displayStr === '') {
    return 0;
  }
  return parseFloat(displayStr);
}
