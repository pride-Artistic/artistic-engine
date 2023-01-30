import { Vector2D } from "src/vector";

export default class Entity {
  private position: Vector2D = new Vector2D();

  public get Position() {
    return this.position;
  }

  public set Position(pos: Vector2D) {
    this.position = pos;
  }
}
