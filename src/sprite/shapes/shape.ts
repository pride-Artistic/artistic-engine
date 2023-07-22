import Sprite from "../sprite";

export default abstract class Shape extends Sprite {
  protected fillStyle: string | CanvasGradient | CanvasPattern = "#000";

  //TODO: constructor?

  public get FillStyle() {
    return this.fillStyle;
  }

  public set FillStyle(fillStyle: string | CanvasGradient | CanvasPattern) {
    this.fillStyle = fillStyle;
  }

  public onDraw(context: CanvasRenderingContext2D, delay: number): void {
    this.onDrawShape(context, delay);
    this.onFillShape(context, delay);
  }

  public abstract onDrawShape(
    context: CanvasRenderingContext2D,
    delay: number
  ): void;

  public abstract onFillShape(
    context: CanvasRenderingContext2D,
    delay: number
  ): void;
}
