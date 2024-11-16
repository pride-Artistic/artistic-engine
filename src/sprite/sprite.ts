import { Entity } from "../entity";
import { Transform } from "../transform";
import IDrawable from "./idrawable";

export default abstract class Sprite extends Entity implements IDrawable {
  protected contextMutator: boolean = false;

  private region: (() => Path2D) | undefined;

  private transform: Transform | undefined;

  private opacity: number = 1;

  /**
   * Getter property for transform.
   * @returns The matrix transform applied to this sprite.
   */
  public get Transform(): Transform {
    if (!this.transform) this.transform = new Transform();
    return this.transform;
  }

  /**
   * Getter property for region.
   * @returns The drawing region this sprite is indicating. Sprites are clipped by their region.
   * @see [CanvasRenderingContext2D#clip](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clip)
   */
  public get Region(): (() => Path2D) | undefined {
    return this.region;
  }

  /**
   * Getter property for sprite opacity.
   * @returns Theopacity this sprite is drawn.
   */
  public get Opacity(): number {
    return this.opacity;
  }

  private get needsTransform() {
    return this.transform != null && !this.transform.isIdentity;
  }

  private get hasRegion() {
    return this.region != null;
  }

  private get hasOpacity() {
    return this.opacity !== 1;
  }

  /**
   * Setter property for transform.
   */
  public set Transform(transform: Transform) {
    this.transform = transform;
  }

  /**
   * Setter property for region.
   */
  public set Region(region: (() => Path2D) | undefined) {
    this.region = region;
  }

  /**
   * Setter property for opacity.
   */
  public set Opacity(opacity: number) {
    this.opacity = Math.max(0, Math.min(opacity, 1));
  }

  /**
   * @inheritdoc
   */
  public readonly draw = (context: CanvasRenderingContext2D, delay: number) => {
    context.translate(this.X, this.Y);

    const needsTransform = this.needsTransform;
    const hasRegion = this.hasRegion;
    const hasOpacity = this.hasOpacity;
    this.contextMutator ||= needsTransform || hasRegion || hasOpacity;

    if (this.contextMutator) {
      context.save();

      if (needsTransform) {
        context.transform(
          this.transform!.m11,
          this.transform!.m21,
          this.transform!.m12,
          this.transform!.m22,
          this.transform!.ox,
          this.transform!.oy
        );
      }

      if (hasRegion) {
        this.beforeClip(context, delay);
        const path = this.region!();
        context.clip(path);
      }

      if (hasOpacity) {
        context.globalAlpha = this.opacity;
      }
    }

    this.onDraw(context, delay);

    if (this.contextMutator) {
      context.restore();
      this.afterRestore(context, delay);
    }

    for (const child of this.Children) {
      if (!(child instanceof Sprite)) continue;
      child.draw(context, delay);
    }

    this.afterChildren(context, delay);

    context.translate(-this.X, -this.Y);
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

  /**
   * Post-children tasks performed for canvas context restore.
   * this method is called automatically by engine if attached.
   * @param context Canvas context to perform reset on.
   * @param delay time in milliseconds passed from the previous frame call.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public afterChildren(context: CanvasRenderingContext2D, delay: number) {}

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
