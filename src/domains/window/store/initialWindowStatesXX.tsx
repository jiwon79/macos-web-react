import { WindowState } from '../interface';
import { Window } from '../views';
import { Calculator } from 'domains/app/applications/calculator/views/Calculator';

export const Window1 = () => {
  return (
    <Window>
      <Window.MovableArea>
        <Window.Control size={'standard'} />
      </Window.MovableArea>
      <p>window 1</p>
    </Window>
  );
};

export const Window2 = () => {
  return (
    <Window>
      <Window.MovableArea>
        <Window.Control size={'withTitle'} />
        <p>window 2</p>
      </Window.MovableArea>
    </Window>
  );
};

export const Window3 = () => {
  return (
    <Window>
      <Window.MovableArea>
        <Window.Control />
      </Window.MovableArea>
      <p>window 3</p>
    </Window>
  );
};

export const initialWindowStates: WindowState[] = [
  {
    id: '1',
    appID: '1',
    content: <Window1 />,
    style: {
      x: 10,
      y: 100,
      width: 200,
      height: 150,
    },
  },
  {
    id: '2',
    appID: '2',
    content: <Window2 />,
    style: {
      x: 200,
      y: 200,
      width: 100,
      height: 100,
    },
  },
  {
    id: '3',
    appID: 'calculator',
    content: <Calculator />,
    style: {
      x: 30,
      y: 280,
      width: 232,
      height: 321,
    },
  },
];
