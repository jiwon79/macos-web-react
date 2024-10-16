type EventListener<EventMap, EventType extends keyof EventMap> = (
  e: EventMap[EventType]
) => void;

type EventListenerMap<EventMap> = {
  [K in keyof EventMap]: Set<EventListener<EventMap, K>>;
};

export class EventManager<
  EventMap,
  EventType extends keyof EventMap = keyof EventMap,
> {
  private listeners: EventListenerMap<EventMap> =
    {} as EventListenerMap<EventMap>;

  on<T extends EventType>(
    type: T,
    listener: EventListener<EventMap, T>
  ) {
    if (!this.listeners[type]) {
      this.listeners[type] = new Set();
    }

    this.listeners[type].add(listener);
  }

  off<T extends EventType>(
    type: T,
    listener: EventListener<EventMap, T>
  ) {
    if (!this.listeners[type]) {return;}
    this.listeners[type].delete(listener);
  }

  emit<T extends EventType>(type: T, event: EventMap[T]) {
    if (!this.listeners[type]) {return;}
    this.listeners[type].forEach((listener) => listener(event));
  }

  destroy() {
    this.listeners = {} as EventListenerMap<EventMap>;
  }
}
