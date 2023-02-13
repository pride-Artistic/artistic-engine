import EntityConstructorConfig from "../entity/entity_config";

export default interface SpriteConstructorConfig
  extends EntityConstructorConfig {
  drawer: (
    context: CanvasRenderingContext2D,
    delay: number
  ) => void | undefined;
}
