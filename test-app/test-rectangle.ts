import { Engine, Sprite } from "../src";
import { Modifier, EaseFunctions } from "../src/modifier";

export default class TestRectangle extends Sprite {
  private color: string;

  private isXmoving: boolean;

  private engine: Engine;

  private modifier: Modifier | undefined;

  constructor(color: string, isXMoving: boolean, engine: Engine) {
    super({
      W: 100,
      H: 100,
    });
    this.color = color;
    this.isXmoving = isXMoving;
    this.engine = engine;
  }

  public override onDraw(context: CanvasRenderingContext2D): void {
    context.fillStyle = this.color;
    context.fillRect(0, 0, this.Width, this.Height);

    if (!this.modifier || this.modifier.Progress >= 1) {
      if (this.isXmoving)
        this.Y = Math.random() * (context.canvas.height - this.Height);
      else this.X = Math.random() * (context.canvas.width - this.Width);

      this.modifier = new Modifier(
        this.isXmoving ? -this.Width : -this.Height,
        this.isXmoving ? context.canvas.width : context.canvas.height,
        2000,
        (v: number) => {
          if (this.isXmoving) this.X = v;
          else this.Y = v;
        },
        EaseFunctions.EaseInOutCirc
      );
      this.engine.registerModifier(this.modifier);
    }
  }
}
