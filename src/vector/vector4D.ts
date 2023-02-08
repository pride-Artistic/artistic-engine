import Vector from "./vector";

export default class Vector4D extends Vector {
  readonly size = 4;

  private _W: number = 0;

  private _X: number = 0;

  private _Y: number = 0;

  private _Z: number = 0;

  constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
    super();
    this.X = x;
    this.Y = y;
    this.Z = z;
    this.W = w;
  }

  public get W() {
    return this._W;
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

  public set W(w: number) {
    this._W = w;
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

  public get_tuple(): [number, number, number, number] {
    return [this.X, this.Y, this.Z, this.W];
  }
}
