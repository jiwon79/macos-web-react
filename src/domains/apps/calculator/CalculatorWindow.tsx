import { Window } from 'domains/window';
import {
  button,
  buttonContainer,
  display,
  displayContainer,
} from './CalculatorWindow.css';
import { useState } from 'react';

export function CalculatorWindow() {
  const [displayStr, setDisplayStr] = useState('0');

  return (
    <Window>
      <Window.MovableArea>
        <Window.Control size="withTitle" />
      </Window.MovableArea>
      <div className={displayContainer}>
        <p className={display}>{displayStr}</p>
      </div>
      <div className={buttonContainer}>
        <button className={button({ type: 'function' })}>AC</button>
        <button className={button({ type: 'function' })}>+/-</button>
        <button className={button({ type: 'function' })}>%</button>
        <button className={button({ type: 'operator' })}>/</button>
        <button className={button({ type: 'number' })}>7</button>
        <button className={button({ type: 'number' })}>8</button>
        <button className={button({ type: 'number' })}>9</button>
        <button className={button({ type: 'operator' })}>x</button>
        <button className={button({ type: 'number' })}>4</button>
        <button className={button({ type: 'number' })}>5</button>
        <button className={button({ type: 'number' })}>6</button>
        <button className={button({ type: 'operator' })}>-</button>
        <button className={button({ type: 'number' })}>1</button>
        <button className={button({ type: 'number' })}>2</button>
        <button className={button({ type: 'number' })}>3</button>
        <button className={button({ type: 'operator' })}>+</button>
        <button className={button({ type: 'number_wide' })}>0</button>
        <button className={button({ type: 'number' })}>.</button>
        <button className={button({ type: 'operator' })}>=</button>
      </div>
    </Window>
  );
}
