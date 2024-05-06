import { Window } from 'domains/window';
import { useState } from 'react';
import { Keypad } from '../Keypad';
import { display, displayContainer, keypadContainer } from './Calculator.css';

export function Calculator() {
  const [displayStr, setDisplayStr] = useState('0');

  return (
    <Window>
      <Window.MovableArea>
        <Window.Control size="withTitle" />
      </Window.MovableArea>
      <div className={displayContainer}>
        <p className={display}>{displayStr}</p>
      </div>
      <div className={keypadContainer}>
        <Keypad type="function">AC</Keypad>
        <Keypad type="function">+/-</Keypad>
        <Keypad type="function">%</Keypad>
        <Keypad type="operator">/</Keypad>
        <Keypad type="number">7</Keypad>
        <Keypad type="number">8</Keypad>
        <Keypad type="number">9</Keypad>
        <Keypad type="operator">x</Keypad>
        <Keypad type="number">4</Keypad>
        <Keypad type="number">5</Keypad>
        <Keypad type="number">6</Keypad>
        <Keypad type="operator">-</Keypad>
        <Keypad type="number">1</Keypad>
        <Keypad type="number">2</Keypad>
        <Keypad type="number">3</Keypad>
        <Keypad type="operator">+</Keypad>
        <Keypad type="number_wide">0</Keypad>
        <Keypad type="number">.</Keypad>
        <Keypad type="operator">=</Keypad>
      </div>
    </Window>
  );
}
