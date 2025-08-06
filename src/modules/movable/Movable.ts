import { EventManager } from "modules/event-manager";
import { assert } from "utils/functions";
import type { MovableEventMap, MovableOptions } from "./interface";

export class Movable {
  private eventManager: EventManager<MovableEventMap> = new EventManager();
  private isMoving: boolean = false;

  private firstMousePosition: Record<"x" | "y", number> | undefined;

  constructor(
    protected handlerElement: HTMLElement,
    private options: MovableOptions = { manual: false }
  ) {
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.attachEventListeners();
  }

  on<K extends keyof MovableEventMap>(
    type: K,
    listener: (e: MovableEventMap[K]) => void
  ) {
    this.eventManager.on(type, listener);
  }

  off<K extends keyof MovableEventMap>(
    type: K,
    listener: (e: MovableEventMap[K]) => void
  ) {
    this.eventManager.off(type, listener);
  }

  destroy() {
    this.eventManager.destroy();
    this.detachEventListeners();
  }

  onMouseDown = (event: MouseEvent) => {
    this.eventManager.emit("startMove", { nativeEvent: event });
    this.firstMousePosition = { x: event.clientX, y: event.clientY };
    this.isMoving = true;

    document.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("mouseup", this.onMouseUp);
  };

  private onMouseMove = (event: MouseEvent) => {
    if (!this.isMoving) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    assert(
      this.firstMousePosition,
      "firstMousePosition is not defined at mousemove event."
    );

    const delta = {
      x: event.clientX - this.firstMousePosition.x,
      y: event.clientY - this.firstMousePosition.y
    };

    this.eventManager.emit("move", { nativeEvent: event, delta });
  };

  private onMouseUp = (event: MouseEvent) => {
    if (!this.isMoving) {
      return;
    }

    this.eventManager.emit("endMove", { nativeEvent: event });
    this.isMoving = false;
    this.firstMousePosition = undefined;

    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("mouseup", this.onMouseUp);
  };

  private attachEventListeners() {
    this.options?.manual &&
      this.handlerElement.addEventListener("mousedown", this.onMouseDown);
  }

  private detachEventListeners() {
    this.options?.manual &&
      this.handlerElement.removeEventListener("mousedown", this.onMouseDown);
    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("mouseup", this.onMouseUp);
  }
}
