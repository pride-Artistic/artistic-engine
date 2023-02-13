import { Entity } from "../entity";
import SpriteConstructorConfig from "./sprite_config";

export default class Sprite extends Entity {
  private drawer: (context: CanvasRenderingContext2D, delay: number) => void;

  private region: Entity = this;

  constructor(config: SpriteConstructorConfig | undefined) {
    super(config);
    this.drawer = config?.drawer ?? (() => undefined);
  }
}
