import { Engine } from "../src";
import { Rectangle } from "../src/sprite";
import { Modifier, EaseFunctions } from "../src/modifiers";

export default class TestRectangle extends Rectangle {
  private isXmoving: boolean;

  private engine: Engine;

  private modifier: Modifier | undefined;

  constructor(
    color: string | CanvasGradient | CanvasPattern,
    isXMoving: boolean,
    engine: Engine
  ) {
    super({
      W: 100,
      H: 100,
    });
    this.fillStyle = color;
    this.isXmoving = isXMoving;
    this.engine = engine;
  }

  public override onDraw(
    context: CanvasRenderingContext2D,
    delay: number
  ): void {
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

    super.onDraw(context, delay);
  }
}
