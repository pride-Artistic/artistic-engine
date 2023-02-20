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

  public get Region() {
    return this.region;
  }

  public get isSelfRegion(): boolean {
    return this.region === this;
  }

  public set Region(region: Entity) {
    this.region = region;
  }

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
