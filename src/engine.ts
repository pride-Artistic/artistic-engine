import CanvasConfig from "./canvas_config";
import { Entity } from "./entity";
import { Sprite, IDrawable } from "./sprite";
import { Vector2D } from "./vector";

interface ExtendedCanvasRenderingContext2D extends CanvasRenderingContext2D {
  stateCount: number;
  reset(): void;
  restoreRoot(): void;
}

export default class Engine {
  private static isResetCompatible: boolean = false;

  private canvas: HTMLCanvasElement;

  private context: ExtendedCanvasRenderingContext2D;

  private subReset: (context: CanvasRenderingContext2D) => void;

  private previousTimestamp: number = 0;

  private animationId: number = -1;

  private scene: IDrawable = new Sprite();

  public constructor(canvasIdentifier: HTMLCanvasElement | string | null) {
    // locate canvas by HTMLCanvasElement or CSS selector
    let canvas: HTMLCanvasElement | null;
    if (typeof canvasIdentifier === "string") {
      canvas = document.querySelector(
        canvasIdentifier
      ) as HTMLCanvasElement | null;
    } else {
      canvas = canvasIdentifier;
    }

    if (canvas === null) {
      throw new Error("Unable to identify canvas.");
    }

    this.canvas = canvas;
    this.subReset = () => {};

    // request context from given canvas
    const context = this.canvas.getContext(
      "2d"
    ) as ExtendedCanvasRenderingContext2D;

    Engine.fallbackContextReset(context);

    this.context = context;
  }

  public get Canvas() {
    return this.canvas;
  }

  public get Context() {
    return this.context;
  }

  public get Scene(): IDrawable {
    return this.scene;
  }

  public set Scene(scene: IDrawable) {
    if (scene instanceof Entity) {
      scene.setParent(null);
    }
    this.scene = scene;
  }

  private static fallbackContextReset(
    context: ExtendedCanvasRenderingContext2D
  ) {
    if (context.reset != null) {
      return true;
    }

    // CanvasRenderingContext2D#reset is a experimental method. which may not be included in some browsers including firefox.
    // This block will create reset method mocking the behavior described in Chromium source code.
    // In order to keep track of default state stack in context, relevant methods are modifeied/added as a side effect.
    context.save();
    context.stateCount = 0;

    const tempSave = context.save;
    Engine.restoreRootCopy = context.restore;

    context.save = function () {
      tempSave.call(this);
      this.stateCount++;
    };

    context.restore = function () {
      if (this.stateCount > 0) {
        Engine.restoreRootCopy.call(this);
        this.stateCount--;
      }
    };

    context.restoreRoot = function () {
      for (let count = this.stateCount; count > -1; count--) {
        Engine.restoreRootCopy.call(this);
      }
      this.stateCount = -1;
    };

    context.reset = function () {
      this.restoreRoot();
      this.moveTo(0, 0);
      this.beginPath();
      this.closePath();
      this.resetTransform();
      this.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.save();
    };
    return false;
  }

  private static restoreRootContextState(
    context: ExtendedCanvasRenderingContext2D
  ) {
    if (Engine.isResetCompatible) return;

    for (let count = context.stateCount; count > -1; count--) {
      Engine.restoreRootCopy.call(this);
    }
    context.stateCount = -1;
  }

  private static restoreRootCopy() {}

  public setSubResetFunction(
    func: (context: CanvasRenderingContext2D) => void
  ) {
    this.subReset = func;
  }

  public resizeCanvas(config?: CanvasConfig | Vector2D) {
    if (config instanceof Vector2D) {
      this.Canvas.width = config.X;
      this.Canvas.height = config.Y;
    } else {
      this.Canvas.width = config?.w ?? window.innerWidth;
      this.Canvas.height = config?.h ?? window.innerHeight;
    }
    // TODO: emit canvas resize event
  }

  public start() {
    // may be error check.
    this.render(this.previousTimestamp);
  }

  public stop() {
    cancelAnimationFrame(this.animationId);
  }

  private render(timestamp: number) {
    const elapsedTime = timestamp - this.previousTimestamp;
    this.previousTimestamp = timestamp;

    this.context.reset();
    this.subReset(this.context);

    this.scene?.draw(this.context, elapsedTime);

    this.animationId = requestAnimationFrame(this.render.bind(this));
  }
}
