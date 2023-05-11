import Shape from "./shape";

export default class Rectangle extends Shape {
  public onDrawShape(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(0, this.Height);
    context.lineTo(this.Width, this.Height);
    context.lineTo(this.Width, 0);
    context.closePath();
  }

  public onFillShape(context: CanvasRenderingContext2D) {
    context.fillStyle = this.fillStyle;
    context.fill();
  }
}
