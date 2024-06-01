import { Window } from 'domains/window/views';
import { displayText, displayContainer, movableArea } from './Calculator.css';
import { useCalculator } from '../../hooks';
import { calcThemeClass } from '../theme.css';
import { KeypadWrapper } from '../KeypadWrapper';

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
