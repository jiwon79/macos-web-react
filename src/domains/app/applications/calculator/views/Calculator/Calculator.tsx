import { Window } from 'domains/window/views';
import { useCalculator } from '../../hooks';
import { KeypadWrapper } from '../KeypadWrapper';
import { calcThemeClass } from '../theme.css';
import { displayContainer, displayText, movableArea } from './Calculator.css';

export function Calculator() {
  const { display, ...handlers } = useCalculator();

  return (
    <Window className={calcThemeClass}>
      <Window.MovableArea className={movableArea}>
        <Window.Control size="withTitle" />
        <div className={displayContainer}>
          <p className={displayText}>{display}</p>
        </div>
      </Window.MovableArea>
      <KeypadWrapper {...handlers} />
    </Window>
  );
}
