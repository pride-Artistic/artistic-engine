export default class Engine {
  private canvas: HTMLCanvasElement;

  private context: CanvasRenderingContext2D;

  public constructor(canvasIdentifier: HTMLCanvasElement | string) {
    if (typeof canvasIdentifier === "string") {
      this.canvas = document.querySelector(
        canvasIdentifier
      ) as HTMLCanvasElement;
    } else {
      this.canvas = canvasIdentifier;
    }
    this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.context.fillStyle = "red";
    this.context.fillRect(0, 0, 100, 100);
  }
}
