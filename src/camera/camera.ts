export default class Camera {
  private values: [number, number, number, number, number, number];

  constructor(
    m11: number = 0,
    m12: number = 0,
    m21: number = 0,
    m22: number = 0,
    ox: number = 0,
    oy: number = 0
  ) {
    this.values = [m11, m12, m21, m22, ox, oy];
  }

  get m11(): number {
    return this.values[0];
  }

  get m12(): number {
    return this.values[1];
  }

  get m21(): number {
    return this.values[2];
  }

  get m22(): number {
    return this.values[3];
  }

  get ox(): number {
    return this.values[4];
  }

  get oy(): number {
    return this.values[5];
  }

  set m11(value: number) {
    this.values[0] = value;
  }

  set m12(value: number) {
    this.values[1] = value;
  }

  set m21(value: number) {
    this.values[2] = value;
  }

  set m22(value: number) {
    this.values[3] = value;
  }

  set ox(value: number) {
    this.values[4] = value;
  }

  set oy(value: number) {
    this.values[5] = value;
  }

  public scale(x: number, y?: number): this {
    if (y === undefined) {
      return this.scale(x, x);
    }
    [0, 1, 4].forEach((v) => {
      this.values[v] *= x;
    });
    [2, 3, 5].forEach((v) => {
      this.values[v] *= y;
    });
    return this;
  }

  public left(value: number): this {
    this.values[5] -= value;
    return this;
  }

  public right(value: number): this {
    this.values[5] += value;
    return this;
  }

  public up(value: number): this {
    this.values[4] -= value;
    return this;
  }

  public down(value: number): this {
    this.values[4] += value;
    return this;
  }

  public linear(m11: number, m12: number, m21: number, m22: number): this {
    const temp = this.values.slice();
    this.values = [
      m11 * temp[0] + m12 * temp[2],
      m11 * temp[1] + m12 * temp[3],
      m21 * temp[0] + m22 * temp[2],
      m21 * temp[1] + m22 * temp[3],
      m11 * temp[4] + m12 * temp[5],
      m21 * temp[4] + m22 * temp[5],
    ];
    return this;
  }

  public rotate(angle: number): this {
    angle = (angle * Math.PI) / 180;
    const sinValue = Math.sin(angle);
    const cosValue = Math.cos(angle);
    return this.linear(sinValue, cosValue, -cosValue, sinValue);
  }

  public calc(x: number, y: number): [number, number] {
    return [
      this.m11 * x + this.m12 * y + this.ox,
      this.m21 * x + this.m22 * y + this.oy,
    ];
  }

  public toDOM(): DOMMatrix {
    return new DOMMatrix([
      this.m11,
      this.m21,
      this.m12,
      this.m22,
      this.ox,
      this.oy,
    ]);
  }

  public apply(canvas: CanvasRenderingContext2D): DOMMatrix {
    const beforeTransform = canvas.getTransform();
    canvas.setTransform(this.toDOM());
    return beforeTransform;
  }
}
