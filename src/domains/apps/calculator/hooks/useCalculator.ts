import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { round } from '../utils';

type Operator = '+' | '-' | '*' | '/';

function calculatorRound(num: number) {
  return round(num, 10);
}

export function useCalculator() {
  const [display, setDisplay] = useState<string>('0');
  const lastOperator = useRef<Operator | null>(null);
  const lastValue = useRef<number | null>(null);
  const currentValue = useRef<number | null>(0);
  const lastOperatorFunction = useRef<((num: number) => number) | null>(null);

  const blinkDisplay = () => {
    let prevDisplay: string;
    flushSync(() =>
      setDisplay((prev) => {
        prevDisplay = prev;
        return '';
      })
    );
    setTimeout(() => {
      setDisplay(prevDisplay);
    }, 40);
  };

  const onNumberClick = (num: string) => {
    if (display === '0' || currentValue.current === null) {
      setDisplay(num);
      currentValue.current = parseDisplayStr(num);
      return;
    }

    const newDisplay = display + num;
    setDisplay(newDisplay);
    currentValue.current = parseDisplayStr(newDisplay);
  };

  const onDotClick = () => {
    if (display === '0' || currentValue.current === null) {
      setDisplay('0.');
      currentValue.current = 0;
      return;
    }

    if (display.includes('.')) {
      return;
    }
    setDisplay(display + '.');
  };

  const onClearClick = () => {
    lastValue.current = null;
    currentValue.current = null;
    lastOperator.current = null;
    lastOperatorFunction.current = null;
    setDisplay('0');
    blinkDisplay();
  };

  const onPlusMinusClick = () => {
    const parsedDisplay = parseDisplayStr(display);
    setDisplay((parsedDisplay * -1).toString());
  };

  const onOperatorClick = (operator: Operator) => {
    const parsedDisplay = parseDisplayStr(display);
    lastValue.current = parsedDisplay;
    currentValue.current = null;
    lastOperator.current = operator;
    lastOperatorFunction.current = null;
    blinkDisplay();
  };

  const onEqualClick = () => {
    const parsedDisplay = parseDisplayStr(display);

    (() => {
      if (lastValue.current === null) {
        lastValue.current = parsedDisplay;
        currentValue.current = null;
        return;
      }

      if (lastOperatorFunction.current) {
        const result = lastOperatorFunction.current(parsedDisplay);
        setDisplay(calculatorRound(result).toString());
        return;
      }

      if (lastOperator.current === '+') {
        lastOperatorFunction.current = (num: number) => num + parsedDisplay;
        const result = calculatorRound(lastValue.current + parsedDisplay);
        lastValue.current = result;
        currentValue.current = null;
        setDisplay(result.toString());
        return;
      }

      if (lastOperator.current === '-') {
        lastOperatorFunction.current = (num: number) => num - parsedDisplay;
        const result = calculatorRound(lastValue.current - parsedDisplay);
        lastValue.current = result;
        currentValue.current = null;
        setDisplay(result.toString());
        return;
      }

      if (lastOperator.current === '*') {
        lastOperatorFunction.current = (num: number) => num * parsedDisplay;
        const result = calculatorRound(lastValue.current * parsedDisplay);
        lastValue.current = result;
        currentValue.current = null;
        setDisplay(result.toString());
        return;
      }

      if (lastOperator.current === '/') {
        lastOperatorFunction.current = (num: number) => num / parsedDisplay;
        const result = calculatorRound(lastValue.current / parsedDisplay);
        lastValue.current = result;
        currentValue.current = null;
        setDisplay(result.toString());
        return;
      }
    })();

    blinkDisplay();
  };

  const onPercentClick = () => {
    const parsedDisplay = parseDisplayStr(display);
    setDisplay(calculatorRound(parsedDisplay / 100).toString());
  };

  return {
    display,
    onNumberClick,
    onDotClick,
    onClearClick,
    onPlusMinusClick,
    onOperatorClick,
    onPercentClick,
    onEqualClick,
  };
}

function parseDisplayStr(displayStr: string) {
  if (displayStr === '') {
    return 0;
  }
  return parseFloat(displayStr);
}
