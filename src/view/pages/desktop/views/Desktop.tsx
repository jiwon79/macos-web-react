import { Window } from '../../../../domain/window';

export function Desktop() {
  return (
    <>
      <p>MENU</p>
      <Window>
        <Window.Control size={'standard'} />
        <p>window 1</p>
      </Window>
      <Window>
        <Window.Control size={'withTitle'} />
        <p>window 2</p>
      </Window>
      <Window>
        <Window.Control />
        <p>window 3</p>
      </Window>
      <p>DOCK</p>
    </>
  );
}
