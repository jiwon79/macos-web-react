import { Operator } from '../../store';
import { Keypad } from '../Keypad';
import { keypadContainer } from './KeypadWrapper.css';

interface KeypadWrapperProps {
  onNumberClick: (number: number) => void;
  onDotClick: () => void;
  onClearClick: () => void;
  onPlusMinusClick: () => void;
  onPercentClick: () => void;
  onOperatorClick: (operator: Operator) => void;
  onEqualClick: () => void;
}

export function KeypadWrapper({
  onNumberClick,
  onDotClick,
  onClearClick,
  onPlusMinusClick,
  onPercentClick,
  onOperatorClick,
  onEqualClick,
}: KeypadWrapperProps) {
  return (
    <div className={keypadContainer}>
      <Keypad type="function" onClick={onClearClick}>
        AC
      </Keypad>
      <Keypad type="function" onClick={onPlusMinusClick}>
        +/-
      </Keypad>
      <Keypad type="function" onClick={onPercentClick}>
        %
      </Keypad>
      <Keypad type="operator" onClick={() => onOperatorClick('/')}>
        ÷
      </Keypad>
      <Keypad type="number" onClick={() => onNumberClick(7)}>
        7
      </Keypad>
      <Keypad type="number" onClick={() => onNumberClick(8)}>
        8
      </Keypad>
      <Keypad type="number" onClick={() => onNumberClick(9)}>
        9
      </Keypad>
      <Keypad type="operator" onClick={() => onOperatorClick('*')}>
        x
      </Keypad>
      <Keypad type="number" onClick={() => onNumberClick(4)}>
        4
      </Keypad>
      <Keypad type="number" onClick={() => onNumberClick(5)}>
        5
      </Keypad>
      <Keypad type="number" onClick={() => onNumberClick(6)}>
        6
      </Keypad>
      <Keypad type="operator" onClick={() => onOperatorClick('-')}>
        -
      </Keypad>
      <Keypad type="number" onClick={() => onNumberClick(1)}>
        1
      </Keypad>
      <Keypad type="number" onClick={() => onNumberClick(2)}>
        2
      </Keypad>
      <Keypad type="number" onClick={() => onNumberClick(3)}>
        3
      </Keypad>
      <Keypad type="operator" onClick={() => onOperatorClick('+')}>
        +
      </Keypad>
      <Keypad type="number_wide" onClick={() => onNumberClick(0)}>
        0
      </Keypad>
      <Keypad type="number" onClick={onDotClick}>
        .
      </Keypad>
      <Keypad type="operator" onClick={onEqualClick}>
        =
      </Keypad>
    </div>
  );
}
