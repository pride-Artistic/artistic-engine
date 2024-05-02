import Engine from "../engine";
import { Sprite } from "../sprite";

export default abstract class Scene extends Sprite {
  public abstract onAttach(engine: Engine, previousScene: Scene): void;
  public abstract onDetach(engine: Engine, nextScene: Scene): void;
}
