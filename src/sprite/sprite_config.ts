import EntityConstructorConfig from "../entity/entity_config";
import Sprite from "./sprite";

export default interface SpriteConstructorConfig
  extends EntityConstructorConfig {
  drawer?: (
    self: Sprite,
    context: CanvasRenderingContext2D,
    delay: number
  ) => void | undefined;
}
