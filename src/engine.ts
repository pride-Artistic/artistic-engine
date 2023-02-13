interface ExtendedCanvasRenderingContext2D extends CanvasRenderingContext2D {
  stateCount: number;
  reset(): void;
  restoreRoot(): void;
}

export default class Engine {
  private canvas: HTMLCanvasElement;

  private context: ExtendedCanvasRenderingContext2D;

  private previousTimestamp: number = 0;

  // private focusedScene: Scene;

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

    // request context from given canvas
    const context = this.canvas.getContext(
      "2d"
    ) as ExtendedCanvasRenderingContext2D;

    // CanvasRenderingContext2D#reset is a experimental method. which may not be included in some browsers including firefox.
    // This block will create reset method mocking the behavior described in Chromium source code.
    // In order to keep track of default state stack in context, relevant methods are modifeied/added as a side effect.
    if (!context.reset) {
      context.save();
      context.stateCount = 0;
      const tempSave = context.save;
      const tempRestore = context.restore;
      context.save = function () {
        tempSave.call(this);
        this.stateCount++;
      };
      context.restore = function () {
        if (this.stateCount > 0) {
          tempRestore.call(this);
          this.stateCount--;
        }
      };

      context.restoreRoot = function () {
        for (let count = this.stateCount; count > -1; count--) {
          tempRestore.call(this);
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
    }

    this.context = context;
  }

  public start() {
    // may be error check.
    this.previousTimestamp = Date.now();
    this.render(this.previousTimestamp);
  }

  private render(timestamp: number) {
    const elapsedTime = timestamp - this.previousTimestamp;
    console.log(elapsedTime);

    requestAnimationFrame(this.render);
  }
}
