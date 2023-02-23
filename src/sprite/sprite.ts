import { Entity, EntityConstructorConfig } from "../entity";

export interface SpriteConstructorConfig extends EntityConstructorConfig {
  drawer?: (
    self: Sprite,
    context: CanvasRenderingContext2D,
    delay: number
  ) => void;
}

export class Sprite extends Entity {
  private drawer: (
    self: Sprite,
    context: CanvasRenderingContext2D,
    delay: number
  ) => void;

  private region: Entity = this;

  constructor(config?: SpriteConstructorConfig) {
    super(config);
    this.drawer = config?.drawer ?? (() => undefined);
  }

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
   * @internal
   */
  public draw(context: CanvasRenderingContext2D, delay: number) {
    context.save();
    context.beginPath();
    context.rect(
      this.region.AbsoluteX,
      this.region.AbsoluteY,
      this.region.Width,
      this.region.Height
    );
    context.clip();
    this.drawer(this, context, delay);
    context.restore();
    for (const child of this.Children) {
      if (!(child instanceof Sprite)) continue;
      child.draw(context, delay);
    }
  }
}
