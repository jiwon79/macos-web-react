import { Window } from '../../../../domain/window';

export function Desktop() {
  return (
    <>
      <p>MENU</p>
      <Window>
        <Window.ControlMenu />
        <p>window 1</p>
      </Window>
      <Window>
        <Window.ControlMenu />
        <p>window 2</p>
      </Window>
      <Window>
        <Window.ControlMenu />
        <p>window 3</p>
      </Window>
      <p>DOCK</p>
    </>
  );
}
