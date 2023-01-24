export default class Engine {
  private canvas: HTMLCanvasElement;

  private context: CanvasRenderingContext2D;

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
    this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
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
