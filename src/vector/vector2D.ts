import Vector from "./vector";

export default class Vector2D extends Vector {
  constructor(x: number = 0, y: number = 0) {
    super(x, y);
  }

  public get X() {
    return this.values[0];
  }

  public get Y() {
    return this.values[1];
  }

  public set X(x: number) {
    this.values[0] = x;
  }

  public set Y(y: number) {
    this.values[1] = y;
  }
}
