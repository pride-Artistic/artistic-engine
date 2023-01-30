import { Vector2D } from "src/vector";

export default class Entity {
  private _position: Vector2D = new Vector2D();

  public get Position() {
    return this._position;
  }

  public set Position(pos: Vector2D) {
    this._position = pos;
  }
}
