import Shape from "./shape";

export default class Ellipse extends Shape {
  private static readonly PI2 = Math.PI * 2;

  public onDrawShape(context: CanvasRenderingContext2D) {
    context.beginPath();

    const halfWidth = this.Width / 2;
    const halfHeight = this.Height / 2;
    context.ellipse(
      halfWidth,
      halfHeight,
      halfWidth,
      halfHeight,
      0,
      0,
      Ellipse.PI2
    );

    context.closePath();
  }

  public onFillShape(context: CanvasRenderingContext2D) {
    context.fillStyle = this.fillStyle;
    context.fill();
  }
}
