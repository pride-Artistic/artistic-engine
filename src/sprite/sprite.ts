import { Entity } from "../entity";
import IDrawable from "./idrawable";

export default class Sprite extends Entity implements IDrawable {
  private region: Entity = this;

  /**
   * Getter property for region.
   * @returns The drawing region this sprite is indicating. Sprites are clipped by their region.
   * @see [CanvasRenderingContext2D#clip](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clip)
   */
  public get Region() {
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
   * Setter property for region.
   */
  public set Region(region: Entity) {
    this.region = region;
  }

  /**
   * @inheritdoc
   */
  public readonly draw = (context: CanvasRenderingContext2D, delay: number) => {
    this.beforeDraw(context, delay);
    this.onDraw(context, delay);
    this.afterDraw(context, delay);
  };

  /**
   * Pre-render tasks performed for canvas context reset.
   * this method is called automatically by engine if attached.
   * @param context Canvas context to perform reset on.
   * @param delay time in milliseconds passed from the previous frame call.
   */
  public beforeDraw(context: CanvasRenderingContext2D, delay: number) {
    // todo: remove after interface extraction
    console.log(delay);

    context.save();
    context.beginPath();
    context.rect(
      this.region.AbsoluteX,
      this.region.AbsoluteY,
      this.region.Width,
      this.region.Height
    );
    context.clip();
  }

  /**
   * Render tasks performed for canvas context.
   * this method is called automatically by engine if attached.
   * @param context Canvas context to perform reset on.
   * @param delay time in milliseconds passed from the previous frame call.
   */
  public onDraw(context: CanvasRenderingContext2D, delay: number) {
    // stub
    // todo: make sprite class abstract.
    console.log(context, delay);
  }

  /**
   * Post-render tasks performed for canvas context restore.
   * this method is called automatically by engine if attached.
   * @param context Canvas context to perform reset on.
   * @param delay time in milliseconds passed from the previous frame call.
   */
  public afterDraw(context: CanvasRenderingContext2D, delay: number) {
    context.restore();
    for (const child of this.Children) {
      if (!(child instanceof Sprite)) continue;
      child.draw(context, delay);
    }
  }
}
