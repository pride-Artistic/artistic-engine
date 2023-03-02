import { Sprite } from "../src";

export default class TestRectangle extends Sprite {
  private color: string;

  private isXmoving: boolean;

  constructor(color: string, isXMoving: boolean) {
    super({
      W: 100,
      H: 100,
    });
    this.color = color;
    this.isXmoving = isXMoving;
  }

  public override onDraw(
    context: CanvasRenderingContext2D,
    delay: number
  ): void {
    context.fillStyle = this.color;
    context.fillRect(this.AbsoluteX, this.AbsoluteY, this.Width, this.Height);
    const moveWidth = context.canvas.width + this.Width;
    const moveHeight = context.canvas.height + this.Height;
    if (this.isXmoving) {
      const rawX = this.X + delay + this.Width;
      if (rawX > moveWidth)
        this.Y = Math.random() * (context.canvas.height - this.Height);
      this.X = (rawX % moveWidth) - this.Width;
    } else {
      const rawY = this.Y + delay + this.Height;
      if (rawY > moveHeight)
        this.X = Math.random() * (context.canvas.width - this.Width);
      this.Y = (rawY % moveHeight) - this.Height;
    }
  }
}
