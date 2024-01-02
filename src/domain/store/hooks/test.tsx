import { Window } from '../../window';
import { WindowInfo } from '../interface';

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

export const initWindowInfos: WindowInfo[] = [
  {
    id: '1',
    title: 'Window 1',
    window: <Window1 />,
    x: 10,
    y: 100,
    width: 200,
    height: 150,
  },
  {
    id: '2',
    title: 'Window 2',
    window: <Window2 />,
    x: 200,
    y: 200,
    width: 100,
    height: 100,
  },
  {
    id: '3',
    title: 'Window 3',
    window: <Window3 />,
    x: 30,
    y: 250,
    width: 200,
    height: 80,
  },
];
