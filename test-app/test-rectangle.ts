import { Engine } from "../src";
import { Rectangle } from "../src/sprite";
import {
  Modifier,
  EaseFunctions,
  SequentialModifier,
  ConcurrentModifier,
} from "../src/modifiers";
import { IPointerListener } from "../src/event";

export default class TestRectangle
  extends Rectangle
  implements IPointerListener
{
  public PointerRegistered: boolean = true;

  public RecieveEventsOutOfBound: boolean = false;

  private isXmoving: boolean;

  private engine: Engine;

  private modifier: Modifier | undefined;

  private color: string | CanvasGradient | CanvasPattern;

  constructor(
    color: string | CanvasGradient | CanvasPattern,
    isXMoving: boolean,
    engine: Engine
  ) {
    super({
      W: 100,
      H: 100,
    });
    this.color = color;
    this.fillStyle = color;
    this.isXmoving = isXMoving;
    this.engine = engine;
  }

  public onPointer(): boolean {
    this.fillStyle = "green";
    return false;
  }

  public override onDraw(
    context: CanvasRenderingContext2D,
    delay: number
  ): void {
    if (!this.modifier || this.modifier.Progress >= 1) {
      if (this.isXmoving) {
        this.Y = 0; //Math.random() * (context.canvas.height - this.Height);

        const mod1 = new Modifier(
          -this.Width,
          context.canvas.width,
          2000,
          (v: number) => {
            this.X = v;
          },
          EaseFunctions.EaseInOutCirc
        );

        const mod2 = new Modifier(
          context.canvas.width,
          -this.Width,
          2000,
          (v: number) => {
            this.X = v;
          },
          EaseFunctions.EaseInOutCirc
        );

        const mod3 = new Modifier(
          0,
          -this.Height,
          3000,
          (v: number) => {
            this.Y = v;
          },
          (p: number) => {
            return Math.sin(p * Math.PI * 12);
          }
        );

        const mod5 = new Modifier(0, Math.PI * 2, 2000, (v: number) => {
          this.Transform.reset();
          this.Transform.rotate(v);
        });

        const mod4 = new Modifier(0, 0, 1000, () => {});

        this.modifier = new ConcurrentModifier(
          new SequentialModifier(mod1, new ConcurrentModifier(mod2, mod5)),
          new SequentialModifier(mod4, mod3)
        );
      } else {
        this.X = Math.random() * (context.canvas.width - this.Width);

        this.modifier = new Modifier(
          -this.Height,
          context.canvas.height,
          2000,
          (v: number) => {
            this.Y = v;
          },
          EaseFunctions.EaseInOutCirc
        );
      }
      this.engine.registerModifier(this.modifier);
    }

    super.onDraw(context, delay);
  }
}
