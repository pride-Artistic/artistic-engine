export default class Engine {
  private canvas: HTMLCanvasElement;

  private context: CanvasRenderingContext2D;

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
}
