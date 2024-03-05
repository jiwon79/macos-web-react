import {
  ResizableEventByType,
  ResizableEventListener,
  ResizableEventType,
} from './interfaces';

export class ResizableEventManager {
  private listeners: {
    [K in ResizableEventType]: Set<ResizableEventListener<K>>;
  } = {
    resize: new Set(),
    startResize: new Set(),
    endResize: new Set(),
  };

  public on<T extends ResizableEventType>(
    type: T,
    listener: ResizableEventListener<T>
  ) {
    this.listeners[type].add(listener);
  }

  public off<T extends ResizableEventType>(
    type: T,
    listener: ResizableEventListener<T>
  ) {
    this.listeners[type].delete(listener);
  }

  public emit<T extends ResizableEventType>(
    type: T,
    event: ResizableEventByType[T]
  ) {
    this.listeners[type].forEach((listener) => listener(event));
  }

  public destroy() {
    this.listeners = {
      resize: new Set(),
      startResize: new Set(),
      endResize: new Set(),
    };
  }
}
