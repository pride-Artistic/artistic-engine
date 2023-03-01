import { Sprite } from "../src";

export default class GridScene extends Sprite {
  private gridSize: number;

  constructor(width: number, height: number, gridSize: number) {
    super({
      w: width,
      h: height,
    });
    this.gridSize = gridSize;
  }

  public override onDraw(context: CanvasRenderingContext2D): void {
    context.fillStyle = "black";
    context.fillRect(0, 0, this.Width, this.Height);
    context.fillStyle = "white";
    context.strokeStyle = "white";
    for (let i = 0; i < this.Width; i += this.gridSize) {
      context.fillText(String(i), i + 1, 10);
      context.moveTo(i, 0);
      context.lineTo(i, this.Height);
    }
    for (let i = this.gridSize; i < this.Height; i += this.gridSize) {
      context.fillText(String(i), 1, i - 2);
      context.moveTo(0, i);
      context.lineTo(this.Width, i);
    }
    context.stroke();
  }
}
