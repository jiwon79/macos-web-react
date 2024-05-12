import { Window } from 'domains/window';
import { useRef, useState } from 'react';
import { Keypad } from '../Keypad';
import {
  displayText,
  displayContainer,
  keypadContainer,
  movableArea,
} from './Calculator.css';

function parseDisplayStr(displayStr: string) {
  if (displayStr === '') {
    return 0;
  }
  return parseFloat(displayStr);
}

export function Calculator() {
  const [display, setDisplay] = useState<string>('0');
  const lastOperator = useRef<string | null>(null);
  const isOperatorClicked = useRef<boolean>(false);
  const lastValue = useRef<number | null>(null);
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

  return (
    <Window>
      <Window.MovableArea className={movableArea}>
        <Window.Control size="withTitle" />
        <div className={displayContainer}>
          <p className={displayText}>{display}</p>
        </div>
      </Window.MovableArea>
      <div className={keypadContainer}>
        <Keypad type="function" onClick={onClearClick}>
          AC
        </Keypad>
        <Keypad type="function" onClick={onPlusMinusClick}>
          +/-
        </Keypad>
        <Keypad type="function">%</Keypad>
        <Keypad type="operator">/</Keypad>
        <Keypad type="number" onClick={() => onNumberClick('7')}>
          7
        </Keypad>
        <Keypad type="number" onClick={() => onNumberClick('8')}>
          8
        </Keypad>
        <Keypad type="number" onClick={() => onNumberClick('9')}>
          9
        </Keypad>
        <Keypad type="operator">x</Keypad>
        <Keypad type="number" onClick={() => onNumberClick('4')}>
          4
        </Keypad>
        <Keypad type="number" onClick={() => onNumberClick('5')}>
          5
        </Keypad>
        <Keypad type="number" onClick={() => onNumberClick('6')}>
          6
        </Keypad>
        <Keypad type="operator">-</Keypad>
        <Keypad type="number" onClick={() => onNumberClick('1')}>
          1
        </Keypad>
        <Keypad type="number" onClick={() => onNumberClick('2')}>
          2
        </Keypad>
        <Keypad type="number" onClick={() => onNumberClick('3')}>
          3
        </Keypad>
        <Keypad type="operator" onClick={onPlustClick}>
          +
        </Keypad>
        <Keypad type="number_wide" onClick={() => onNumberClick('0')}>
          0
        </Keypad>
        <Keypad type="number" onClick={onDotClick}>
          .
        </Keypad>
        <Keypad type="operator" onClick={onEqualClick}>
          =
        </Keypad>
      </div>
    </Window>
  );
}
