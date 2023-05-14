import { Transform } from "../src";
import { Sprite } from "../src/sprite";

export default class GridScene extends Sprite {
  private gridSize: number;

  private minx = Infinity;

  private miny = Infinity;

  private maxx = -Infinity;

  private maxy = -Infinity;

  private invertedTransform = new Transform();

  constructor(width: number, height: number, gridSize: number) {
    super({
      W: width,
      H: height,
    });
    this.gridSize = gridSize;
    this.Region = () => {
      const p = new Path2D();
      p.moveTo(this.minx, this.miny);
      p.lineTo(this.minx, this.maxy);
      p.lineTo(this.maxx, this.maxy);
      p.lineTo(this.maxx, this.miny);
      p.closePath();
      return p;
    };
  }

  public override beforeClip(context: CanvasRenderingContext2D): void {
    const t = Transform.fromDOM(context.getTransform());
    const c = this.Transform.copy();
    c.multiply(t); // TODO: check multiply sequence
    this.invertedTransform = t.invert();

    const coorx = [0, context.canvas.width];
    const coory = [0, context.canvas.height];

    for (const x of coorx) {
      for (const y of coory) {
        const v = this.invertedTransform.apply(x, y);
        const xx = v.X;
        const yy = v.Y;
        this.minx = Math.min(xx, this.minx);
        this.maxx = Math.max(xx, this.maxx);
        this.miny = Math.min(yy, this.miny);
        this.maxy = Math.max(yy, this.maxy);
      }
    }

    this.Width = this.maxx - this.minx;
    this.Height = this.maxy - this.miny;
  }

  public override onDraw(context: CanvasRenderingContext2D): void {
    context.fillStyle = "black";
    context.fillRect(this.minx, this.miny, this.Width, this.Height);
    context.fillStyle = "white";
    context.strokeStyle = "white";
    for (
      let i = Math.floor(this.minx / 100) * 100;
      i < this.maxx;
      i += this.gridSize
    ) {
      context.fillText(String(i), i + 1, 10);
      context.moveTo(i, this.miny);
      context.lineTo(i, this.maxy);
    }

    for (
      let i = Math.floor(this.miny / 100) * 100 + this.gridSize;
      i < this.maxy;
      i += this.gridSize
    ) {
      context.fillText(String(i), 1, i - 2);
      context.moveTo(this.minx, i);
      context.lineTo(this.maxx, i);
    }
    context.stroke();
  }
}
