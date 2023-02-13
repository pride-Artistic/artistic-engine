import { Entity } from "../entity";
import SpriteConstructorConfig from "./sprite_config";

export default class Sprite extends Entity {
  private drawer: (
    self: Sprite,
    context: CanvasRenderingContext2D,
    delay: number
  ) => void;

  private region: Entity = this;

  constructor(config: SpriteConstructorConfig | undefined = undefined) {
    super(config);
    this.drawer = config?.drawer ?? (() => undefined);
  }

  public draw(context: CanvasRenderingContext2D, delay: number) {
    this.drawer(this, context, delay);
    for (const child of this.Children) {
      if (!(child instanceof Sprite)) continue;
      child.draw(context, delay);
    }
  }
}
