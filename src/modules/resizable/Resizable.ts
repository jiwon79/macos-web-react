import { EventManager } from 'modules/event-manager/EventManager';
import { filterUndefinedFromObject } from '../../utils/object';
import {
  ResizableEventListener,
  ResizableEventMap,
  ResizableEventType,
  ResizableOptions,
  ResizableResizeEvent,
} from './interfaces';

export class Resizable {
  private eventManager: EventManager<ResizableEventMap> = new EventManager();
  private isResizing: boolean = false;

  private firstMousePosition: Record<'x' | 'y', number> | undefined;

  private firstRect: Pick<DOMRect, 'width' | 'height'> | undefined;
  private latestRect: Pick<DOMRect, 'width' | 'height'> | undefined;

  private ratio: number | undefined;

  private options: ResizableOptions;

  constructor(
    protected targetElement: HTMLElement,
    protected handlerElement: HTMLElement,
    _options: Partial<ResizableOptions>
  ) {
    this.options = {
      ..._options,
      verticalPositiveDeltaDirection:
        _options.verticalPositiveDeltaDirection ?? 'bottom',
      horizontalPositiveDeltaDirection:
        _options.horizontalPositiveDeltaDirection ?? 'right',
    };
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.attachEventListeners();
  }

  public on<T extends ResizableEventType>(
    type: T,
    listener: ResizableEventListener<T>
  ) {
    this.eventManager.on(type, listener);
  }

  public off<T extends ResizableEventType>(
    type: T,
    listener: ResizableEventListener<T>
  ) {
    this.eventManager.off(type, listener);
  }

  private resize(
    e: MouseEvent
  ): Promise<Omit<ResizableResizeEvent, 'nativeEvent'> | null> {
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        const resizedWidth = this.getResizedWidth(e);
        const resizedHeight = this.getResizedHeight(e);

        if (
          this.options.keepRatio &&
          this.ratio != null &&
          resizedWidth != null &&
          resizedHeight != null
        ) {
          if (resizedWidth.delta > 0 && resizedHeight.delta > 0) {
            if (resizedWidth.size / resizedHeight.size > this.ratio) {
              resolve({
                width: resizedWidth.size,
                height: resizedWidth.size / this.ratio,
                horizontalPositiveDeltaDirection:
                  this.options.horizontalPositiveDeltaDirection,
                verticalPositiveDeltaDirection:
                  this.options.verticalPositiveDeltaDirection,
                delta: {
                  width: resizedWidth.delta,
                  height: resizedWidth.delta / this.ratio,
                },
              });
              return;
            }
            resolve({
              width: resizedHeight.size * this.ratio,
              height: resizedHeight.size,
              horizontalPositiveDeltaDirection:
                this.options.horizontalPositiveDeltaDirection,
              verticalPositiveDeltaDirection:
                this.options.verticalPositiveDeltaDirection,
              delta: {
                width: resizedHeight.delta * this.ratio,
                height: resizedHeight.delta,
              },
            });
            return;
          }
          if (resizedWidth.delta < 0 && resizedHeight.delta >= 0) {
            resolve({
              width: resizedHeight.size * this.ratio,
              height: resizedHeight.size,
              horizontalPositiveDeltaDirection:
                this.options.horizontalPositiveDeltaDirection,
              verticalPositiveDeltaDirection:
                this.options.verticalPositiveDeltaDirection,
              delta: {
                width: resizedHeight.delta * this.ratio,
                height: resizedHeight.delta,
              },
            });
            return;
          }
          if (resizedWidth.delta >= 0 && resizedHeight.delta < 0) {
            resolve({
              width: resizedWidth.size,
              height: resizedWidth.size / this.ratio,
              horizontalPositiveDeltaDirection:
                this.options.horizontalPositiveDeltaDirection,
              verticalPositiveDeltaDirection:
                this.options.verticalPositiveDeltaDirection,
              delta: {
                width: resizedWidth.delta,
                height: resizedWidth.delta / this.ratio,
              },
            });
            return;
          }
          if (resizedWidth.delta < 0 && resizedHeight.delta < 0) {
            if (resizedWidth.delta / resizedHeight.delta < this.ratio) {
              resolve({
                width: resizedWidth.size,
                height: resizedWidth.size / this.ratio,
                horizontalPositiveDeltaDirection:
                  this.options.horizontalPositiveDeltaDirection,
                verticalPositiveDeltaDirection:
                  this.options.verticalPositiveDeltaDirection,
                delta: {
                  width: resizedWidth.delta,
                  height: resizedWidth.delta / this.ratio,
                },
              });
              return;
            }
            resolve({
              width: resizedHeight.size * this.ratio,
              height: resizedHeight.size,
              horizontalPositiveDeltaDirection:
                this.options.horizontalPositiveDeltaDirection,
              verticalPositiveDeltaDirection:
                this.options.verticalPositiveDeltaDirection,
              delta: {
                width: resizedHeight.delta * this.ratio,
                height: resizedHeight.delta,
              },
            });
            return;
          }
          resolve(null);
          return;
        }
        resolve({
          width: resizedWidth?.size,
          height: resizedHeight?.size,
          horizontalPositiveDeltaDirection:
            this.options.horizontalPositiveDeltaDirection,
          verticalPositiveDeltaDirection:
            this.options.verticalPositiveDeltaDirection,
          delta: {
            width: resizedWidth?.delta,
            height: resizedHeight?.delta,
          },
        });
      });
    });
  }

  private getResizedWidth(
    e: MouseEvent
  ): Record<'size' | 'delta', number> | null {
    if (this.latestRect == null || this.firstRect == null) {
      return null;
    }

    const { clientX: currentMouseX } = e;

    const isOutOfViewport =
      currentMouseX < 0 || currentMouseX > window.innerWidth;

    if (isOutOfViewport) {
      return { size: this.latestRect.width, delta: 0 };
    }

    const delta = this.getDelta(e).x;

    const newWidth = this.firstRect.width + delta;

    if (this.options.maxWidth && newWidth > this.options.maxWidth) {
      return {
        size: this.options.maxWidth,
        delta: delta - newWidth + this.options.maxWidth,
      };
    }

    if (this.options.minWidth && newWidth < this.options.minWidth) {
      return {
        size: this.options.minWidth,
        delta: delta - newWidth + this.options.minWidth,
      };
    }

    return { size: newWidth, delta };
  }

  private getResizedHeight(
    e: MouseEvent
  ): Record<'size' | 'delta', number> | null {
    if (this.latestRect == null || this.firstRect == null) {
      return null;
    }

    const { clientY: currentMouseY } = e;

    const isOutOfViewport =
      currentMouseY < 0 || currentMouseY > window.innerHeight;

    if (isOutOfViewport) {
      return { size: this.latestRect.height, delta: 0 };
    }

    const delta = this.getDelta(e).y;

    const newHeight = this.firstRect.height + delta;

    if (this.options.maxHeight && newHeight > this.options.maxHeight) {
      return {
        size: this.options.maxHeight,
        delta: delta - newHeight + this.options.maxHeight,
      };
    }

    if (this.options.minHeight && newHeight < this.options.minHeight) {
      return {
        size: this.options.minHeight,
        delta: delta - newHeight + this.options.minHeight,
      };
    }

    return { size: newHeight, delta };
  }

  private getDelta(e: MouseEvent): Record<'x' | 'y', number> {
    if (this.firstMousePosition == null) {
      throw new Error('First mouse position is not defined');
    }

    const { x: firstMouseX, y: firstMouseY } = this.firstMousePosition;
    const { clientX: currentMouseX, clientY: currentMouseY } = e;

    return filterUndefinedFromObject({
      x:
        Math.round(currentMouseX - firstMouseX) *
        (this.options.horizontalPositiveDeltaDirection === 'left' ? -1 : 1),
      y:
        Math.round(currentMouseY - firstMouseY) *
        (this.options.verticalPositiveDeltaDirection === 'top' ? -1 : 1),
    });
  }

  private onMouseDown(e: MouseEvent): void {
    const startResizeEvent = { nativeEvent: e };

    if (
      this.options.shouldStartResize?.(startResizeEvent) === false ||
      this.isResizing
    ) {
      return;
    }

    const targetElementRect = this.targetElement.getBoundingClientRect();

    this.isResizing = true;
    this.firstMousePosition = {
      x: e.clientX,
      y: e.clientY,
    };
    this.firstRect = {
      width: Math.round(targetElementRect.width),
      height: Math.round(targetElementRect.height),
    };
    this.latestRect = this.firstRect;
    this.ratio = targetElementRect.width / targetElementRect.height;

    this.eventManager.emit('startResize', startResizeEvent);

    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  private async onMouseMove(e: MouseEvent) {
    if (!this.isResizing) return;

    e.preventDefault();
    e.stopPropagation();

    const resized = await this.resize(e);
    if (resized == null) {
      return;
    }

    const resizeEvent = { nativeEvent: e, ...resized };

    if (this.options.canResize?.(resizeEvent) === false) {
      return;
    }

    this.latestRect = this.latestRect
      ? {
          width: resized.width ?? this.latestRect?.width,
          height: resized.height ?? this.latestRect?.height,
        }
      : undefined;

    this.eventManager.emit('resize', resizeEvent);
  }

  private onMouseUp(e: MouseEvent): void {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);

    this.isResizing = false;
    this.latestRect = undefined;
    this.ratio = undefined;

    this.eventManager.emit('endResize', { nativeEvent: e });
  }

  private attachEventListeners() {
    this.handlerElement.addEventListener('mousedown', this.onMouseDown);
  }

  private detachEventListeners() {
    this.handlerElement.removeEventListener('mousedown', this.onMouseDown);
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  }

  public updateOptions(options: Partial<ResizableOptions>) {
    this.options = { ...this.options, ...options };
  }

  public destroy(): void {
    this.detachEventListeners();
    this.eventManager.destroy();
  }
}
