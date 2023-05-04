import { Sprite } from "../src";

export default class Ailre extends Sprite {
  constructor(X: number = 800, Y: number = 400, H: number = 200) {
    super({ X, Y, H, W: 700 });
  }

  public onDraw(context: CanvasRenderingContext2D): void {
    const WIDTH = 55,
      INNER_MARGIN = 35 / Math.sqrt(2),
      MARGIN = 25 / Math.sqrt(2),
      HALF_HEIGHT = (WIDTH * this.Height) / (WIDTH + INNER_MARGIN);
    // RADIUS = (this.Height - HALF_HEIGHT - MARGIN * 2) / 2;

    let length = 0;
    context.fillStyle = "white";

    // A
    context.beginPath();
    context.moveTo(WIDTH + INNER_MARGIN, 0);
    context.lineTo(0, this.H);
    context.lineTo(WIDTH * 0.75, this.H);
    context.lineTo(WIDTH * 1.75 + INNER_MARGIN, 0);
    context.closePath();
    context.fill();

    context.beginPath();
    context.moveTo(WIDTH * 0.75 + INNER_MARGIN, this.Height);
    context.lineTo(WIDTH * 1.75 + INNER_MARGIN, this.Height);
    context.lineTo(WIDTH * 1.75 + INNER_MARGIN, this.Height - HALF_HEIGHT);
    context.closePath();
    context.fill();
    length = WIDTH * 1.75 + INNER_MARGIN;

    context.beginPath();
    context.moveTo(length + MARGIN, this.Height - HALF_HEIGHT);
    context.lineTo(length + MARGIN, this.Height);
    context.lineTo(length + WIDTH * 0.75 + MARGIN, this.Height);
    context.lineTo(length + WIDTH * 0.75 + MARGIN, this.Height - HALF_HEIGHT);
    context.closePath();
    context.fill();
    length = length + WIDTH * 0.75 + MARGIN;

    context.beginPath();
    context.moveTo(length + MARGIN, 0);
    context.lineTo(length + MARGIN, this.Height);
    context.lineTo(length + WIDTH * 0.75 + MARGIN, this.Height);
    context.lineTo(length + WIDTH * 0.75 + MARGIN, 0);
    context.closePath();
    context.fill();
    length = length + WIDTH * 0.75 + MARGIN;

    context.beginPath();
    context.moveTo(length + MARGIN, this.Height - HALF_HEIGHT);
    context.lineTo(length + MARGIN, this.Height);
    context.lineTo(length + WIDTH * 0.75 + MARGIN, this.Height);
    context.lineTo(length + WIDTH * 0.75 + MARGIN, this.Height - HALF_HEIGHT);
    context.closePath();
    context.fill();
    length = length + WIDTH * 0.75 + MARGIN;

    context.beginPath();
    context.moveTo(length + MARGIN, this.Height - HALF_HEIGHT);
    context.lineTo(
      length + MARGIN + HALF_HEIGHT / 2 - MARGIN / 2,
      this.Height - HALF_HEIGHT
    );
    context.lineTo(length + MARGIN, this.Height - HALF_HEIGHT / 2 - MARGIN / 2);
    context.closePath();
    context.fill();

    context.beginPath();
    context.moveTo(length + MARGIN, this.Height - HALF_HEIGHT / 2 + MARGIN);
    context.lineTo(length + MARGIN, this.Height);
    context.lineTo(length + MARGIN + HALF_HEIGHT, this.Height);
    context.lineTo(length + MARGIN + HALF_HEIGHT, this.Height - HALF_HEIGHT);
    context.lineTo(
      length + MARGIN + HALF_HEIGHT / 2 + MARGIN,
      this.Height - HALF_HEIGHT
    );
    context.closePath();
    context.fill();
  }
}
