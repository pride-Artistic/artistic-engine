import Vector from "./vector";

export default class Vector3D extends Vector {
  constructor(x: number = 0, y: number = 0, z: number = 0) {
    super(x, y, z);
  }

  public get X() {
    return this.values[0];
  }

  public get Y() {
    return this.values[1];
  }

  public get Z() {
    return this.values[2];
  }

  public set X(x: number) {
    this.values[0] = x;
  }

  public set Y(y: number) {
    this.values[1] = y;
  }

  public set Z(z: number) {
    this.values[2] = z;
  }
}
