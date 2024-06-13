import Engine from "../../engine";
import { Sprite } from "..";

export default class Scene extends Sprite {
  public onDraw(context: CanvasRenderingContext2D, delay: number): void {}

  public onAttachEngine(engine: Engine, previousScene: Scene): void {}

  public onDetachEngine(engine: Engine, nextScene: Scene): void {}
}
