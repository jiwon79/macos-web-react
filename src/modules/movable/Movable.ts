import { EventManager } from 'modules/event-manager';
import { MovableEventMap } from './interface';
import { assert } from 'utils/functions';

export class Movable {
  private eventManager: EventManager<MovableEventMap> = new EventManager();
  private isMoving: boolean = false;

  private firstMousePosition: Record<'x' | 'y', number> | undefined;

  constructor(protected handlerElement: HTMLElement) {
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.attachEventListeners();
  }

  public on<K extends keyof MovableEventMap>(
    type: K,
    listener: (e: MovableEventMap[K]) => void
  ) {
    this.eventManager.on(type, listener);
  }

  public off<K extends keyof MovableEventMap>(
    type: K,
    listener: (e: MovableEventMap[K]) => void
  ) {
    this.eventManager.off(type, listener);
  }

  public destroy() {
    this.eventManager.destroy();
    this.detachEventListeners();
  }

  private onMouseDown = (event: MouseEvent) => {
    this.eventManager.emit('startMove', { nativeEvent: event });
    this.firstMousePosition = { x: event.clientX, y: event.clientY };
    this.isMoving = true;

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  };

  private onMouseMove = (event: MouseEvent) => {
    if (!this.isMoving) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    assert(
      this.firstMousePosition,
      'firstMousePosition is not defined at mousemove event.'
    );

    const delta = {
      x: event.clientX - this.firstMousePosition.x,
      y: event.clientY - this.firstMousePosition.y,
    };

    this.eventManager.emit('move', { nativeEvent: event, delta });
  };

  private onMouseUp = (event: MouseEvent) => {
    if (!this.isMoving) {
      return;
    }

    this.eventManager.emit('endMove', { nativeEvent: event });
    this.isMoving = false;
    this.firstMousePosition = undefined;

    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  };

  private attachEventListeners() {
    this.handlerElement.addEventListener('mousedown', this.onMouseDown);
  }

  private detachEventListeners() {
    this.handlerElement.removeEventListener('mousedown', this.onMouseDown);
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }
}
