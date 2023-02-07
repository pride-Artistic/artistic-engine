import Vector from "./vector";

export default class Vector2D extends Vector {
  readonly size = 2;

  private _X: number = 0;

  private _Y: number = 0;

  constructor(x: number = 0, y: number = 0) {
    super();
    this.X = x;
    this.Y = y;
  }

  public get X() {
    return this._X;
  }

  public get Y() {
    return this._Y;
  }

  public set X(x: number) {
    this._X = x;
  }

  public set Y(y: number) {
    this._Y = y;
  }
}
