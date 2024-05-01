import CanvasConfig from "./canvas_config";
import { Entity } from "./entity";
import { IDrawable } from "./sprite";
import { Vector2D } from "./vector";
import checkCompatibility from "./compatibility";
import { BlankScene } from "./scenes";
import { Modifier } from "./modifiers/modifiers";
import { Transform } from "./transform";
import { AssetLoader } from "./loader";

interface ExtendedCanvasRenderingContext2D extends CanvasRenderingContext2D {
  reset(): void;
}

export default class Engine {
  private canvas: HTMLCanvasElement;

  private context: ExtendedCanvasRenderingContext2D;

  private previousTimestamp: number = 0;

  private animationId: number = -1;

  private scene: IDrawable = new BlankScene();

  private subReset: (context: CanvasRenderingContext2D) => void;

  private camera: Transform = new Transform();

  private modifiers: Modifier[] = [];

  private assetLoader: AssetLoader = new AssetLoader();

  /**
   * Constructor will bind Engine object to a given canvas and check for incompatible canvas features and cover.
   * @param canvasIdentifier one of HTMLCnavasElement or css selector string that indicates canvas element.
   */
  public constructor(
    canvasIdentifier: HTMLCanvasElement | string | null,
    canvasConfig?: CanvasRenderingContext2DSettings
  ) {
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
      "2d",
      canvasConfig
    ) as ExtendedCanvasRenderingContext2D;

    this.context = context;

    checkCompatibility(this);
  }

  public get Canvas(): HTMLCanvasElement {
    return this.canvas;
  }

  public get Context(): CanvasRenderingContext2D {
    return this.context;
  }

  public get Scene(): IDrawable {
    return this.scene;
  }

  public get Camera(): Transform {
    return this.camera;
  }

  public get AssetLoader(): AssetLoader {
    return this.assetLoader;
  }

  public set Scene(scene: IDrawable) {
    if (scene instanceof Entity) {
      scene.setParent(null);
    }
    this.scene = scene;
  }

  public set Camera(camera: Transform) {
    this.camera = camera;
  }

  public set AssetLoader(assetLoader: AssetLoader) {
    this.assetLoader = assetLoader;
  }

  /**
   * Register a callback that will be called on each frame.
   * @param func User defined callback that will be executed after each frame is reset completely
   */
  public setSubResetFunction(
    func: (context: CanvasRenderingContext2D) => void
  ) {
    this.subReset = func;
  }

  /**
   * Set canvas width and height to given dimension. Canvas will try to match window size when no arguments are passed.
   * @param config Canvas size dimension.
   */
  public resizeCanvas(config?: CanvasConfig | Vector2D) {
    if (config instanceof Vector2D) {
      this.Canvas.width = config.X;
      this.Canvas.height = config.Y;
    } else {
      this.Canvas.width = config?.W ?? window.innerWidth;
      this.Canvas.height = config?.H ?? window.innerHeight;
    }
    // TODO: emit canvas resize event
  }

  /**
   * Makes bound canvas begin refreshing with given context. This will also start modifiers to update.
   */
  public start() {
    // may be error check.
    this.render(this.previousTimestamp);
  }

  /**
   * Makes bound canvas to stop refreshing. This will also stop modifiers to update.
   */
  public stop() {
    cancelAnimationFrame(this.animationId);
  }

  /**
   * Register and start given modifier from this engine.
   * @param modifier Modifier to halt execution.
   */
  public registerModifier(modifier: Modifier) {
    modifier.register();
    this.modifiers.push(modifier);
  }

  /**
   * Stops and removes given modifier from update pool in this engine.
   * @param modifier Modifier to halt execution.
   */
  public unregisterModifier(modifier: Modifier) {
    this.modifiers = this.modifiers.filter((m) => m !== modifier);
  }

  private render(timestamp: number) {
    const elapsedTime = timestamp - this.previousTimestamp;
    this.previousTimestamp = timestamp;

    let modifiersToRemove: number[] = [];
    for (let i = 0; i < this.modifiers.length; i++) {
      this.modifiers[i].tick();
      if (this.modifiers[i].Progress >= 1) {
        modifiersToRemove.push(i);
      }
    }

    modifiersToRemove = modifiersToRemove.reverse();
    for (const i of modifiersToRemove) {
      this.modifiers.splice(i, 1);
    }

    this.context.reset();
    this.subReset(this.context);

    this.context.transform(
      this.camera.m11,
      this.camera.m21,
      this.camera.m12,
      this.camera.m22,
      this.camera.ox,
      this.camera.oy
    );

    this.scene?.draw(this.context, elapsedTime);

    this.animationId = requestAnimationFrame(this.render.bind(this));
  }
}
