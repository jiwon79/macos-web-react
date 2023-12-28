import { Window } from '../../../../domain/window';

export function Desktop() {
  return (
    <>
      <p>MENU</p>
      <Window>
        <Window.MovableArea>
          <Window.Control size={'standard'} />
        </Window.MovableArea>
        <p>window 1</p>
      </Window>
      <Window>
        <Window.MovableArea>
          <Window.Control size={'withTitle'} />
          <p>window 2</p>
        </Window.MovableArea>
      </Window>
      <Window>
        <Window.MovableArea>
          <Window.Control />
        </Window.MovableArea>
        <p>window 3</p>
      </Window>
      <p>DOCK</p>
    </>
  );
}
