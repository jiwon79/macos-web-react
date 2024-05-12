import { Window } from 'domains/window';
import { Keypad } from '../Keypad';
import {
  displayText,
  displayContainer,
  keypadContainer,
  movableArea,
} from './Calculator.css';
import { useCalculator } from '../../hooks/useCalculator';
import { calcThemeClass } from './calcTheme.css';

export function Calculator() {
  const {
    display,
    onClearClick,
    onNumberClick,
    onDotClick,
    onEqualClick,
    onPlustClick,
    onPlusMinusClick,
  } = useCalculator();

  return (
    <Window className={calcThemeClass}>
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
