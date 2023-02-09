import Vector from "./vector";

export default class Vector4D extends Vector {
  constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
    super(w, x, y, z);
  }

  public get W() {
    return this.values[0];
  }

  public get X() {
    return this.values[1];
  }

  public get Y() {
    return this.values[2];
  }

  public get Z() {
    return this.values[3];
  }

  public set W(w: number) {
    this.values[0] = w;
  }

  public set X(x: number) {
    this.values[1] = x;
  }

  public set Y(y: number) {
    this.values[2] = y;
  }

  public set Z(z: number) {
    this.values[3] = z;
  }
}
