export default class Vector3D {
  private _X: number = 0;

  private _Y: number = 0;

  private _Z: number = 0;

  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this.X = x;
    this.Y = y;
    this.Z = z;
  }

  public get X() {
    return this._X;
  }

  public get Y() {
    return this._Y;
  }

  public get Z() {
    return this._Z;
  }

  public set X(x: number) {
    this._X = x;
  }

  public set Y(y: number) {
    this._Y = y;
  }

  public set Z(z: number) {
    this._Z = z;
  }
}
