import { Entity } from "../entity";
import { Transform } from "../transform";
import IDrawable from "./idrawable";

export default abstract class Sprite extends Entity implements IDrawable {
  private region: Entity | undefined;

  private transform: Transform = new Transform();

  /**
   * Getter property for transform.
   * @returns The matrix transform applied to this sprite.
   */
  public get Transform(): Transform {
    return this.transform;
  }

  /**
   * Getter property for region.
   * @returns The drawing region this sprite is indicating. Sprites are clipped by their region.
   * @see [CanvasRenderingContext2D#clip](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clip)
   */
  public get Region(): Entity | undefined {
    return this.region;
  }

  /**
   * @returns Boolean that determines whether the region of this sprite indicates it self.
   * @see {@link Region}
   */
  public get isSelfRegion(): boolean {
    return this.region === this;
  }

  /**
   * Setter property for transform.
   */
  public set Transform(trnasform: Transform) {
    this.transform = trnasform;
  }

  /**
   * Setter property for region.
   */
  public set Region(region: Entity | undefined) {
    this.region = region;
  }

  /**
   * @inheritdoc
   */
  public readonly draw = (context: CanvasRenderingContext2D, delay: number) => {
    context.save();
    if (this.region) {
      this.beforeClip(context, delay);
      context.translate(this.AbsoluteX, this.AbsoluteY);
      context.transform(
        this.transform.m11,
        this.transform.m21,
        this.transform.m12,
        this.transform.m22,
        this.transform.ox,
        this.transform.oy
      );
      context.beginPath();
      context.rect(0, 0, this.region.Width, this.region.Height);
      context.clip();
    }
    this.onDraw(context, delay);
    context.restore();
    this.afterRestore(context, delay);
    for (const child of this.Children) {
      if (!(child instanceof Sprite)) continue;
      child.draw(context, delay);
    }
  };

  /**
   * Pre-clip tasks performed for canvas context reset.
   * this method is called automatically by engine if attached.
   * @param context Canvas context to perform reset on.
   * @param delay time in milliseconds passed from the previous frame call.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public beforeClip(context: CanvasRenderingContext2D, delay: number) {}

  /**
   * Post-restore tasks performed for canvas context restore.
   * this method is called automatically by engine if attached.
   * @param context Canvas context to perform reset on.
   * @param delay time in milliseconds passed from the previous frame call.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public afterRestore(context: CanvasRenderingContext2D, delay: number) {}

  public resetTransform() {
    this.transform = new Transform();
  }
  /**
   * Render tasks performed for canvas context.
   * this method is called automatically by engine if attached.
   * @param context Canvas context to perform reset on.
   * @param delay time in milliseconds passed from the previous frame call.
   */
  public abstract onDraw(
    context: CanvasRenderingContext2D,
    delay: number
  ): void;
}
