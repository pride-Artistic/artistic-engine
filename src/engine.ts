import CanvasConfig from "./canvas_config";
import { Entity } from "./entity";
import { Sprite, IDrawable } from "./sprite";
import { Vector2D } from "./vector";
import checkCompatibility from "./compatibility";

interface ExtendedCanvasRenderingContext2D extends CanvasRenderingContext2D {
  reset(): void;
}

export default class Engine {
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

    this.context = context;

    checkCompatibility(this);
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
