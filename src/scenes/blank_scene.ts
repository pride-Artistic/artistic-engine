import Engine from "../engine";
import Scene from "./scene";

export default class BlankScene extends Scene {
  public onDraw(_context: CanvasRenderingContext2D, _delay: number): void {}

  public onAttach(_engine: Engine, _previousScene: Scene) {}

  public onDetach(_engine: Engine, _nextScene: Scene) {}
}
