export default class Vector2D {
  private _X: number = 0;

  private _Y: number = 0;

  constructor(x: number = 0, y: number = 0) {
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
