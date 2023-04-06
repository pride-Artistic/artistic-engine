import { Vector2D } from "../vector";

export default class Transform {
  private values: [number, number, number, number, number, number];

  constructor(
    m11: number = 1,
    m12: number = 0,
    m21: number = 0,
    m22: number = 1,
    ox: number = 0,
    oy: number = 0
  ) {
    this.values = [m11, m12, m21, m22, ox, oy];
  }

  /**
   * Getter property of m11
   */
  get m11(): number {
    return this.values[0];
  }

  /**
   * Getter property of m12
   */
  get m12(): number {
    return this.values[1];
  }

  /**
   * Getter property of m21
   */
  get m21(): number {
    return this.values[2];
  }

  /**
   * Getter property of m22
   */
  get m22(): number {
    return this.values[3];
  }

  /**
   * Getter property of offset x
   */
  get ox(): number {
    return this.values[4];
  }

  /**
   * Getter property of offset y
   */
  get oy(): number {
    return this.values[5];
  }

  get Determinant(): number {
    return this.m11 * this.m22 - this.m12 * this.m21;
  }

  get isInvertible(): boolean {
    return this.Determinant !== 0;
  }

  get isIdentity(): boolean {
    return (
      this.m11 === 1 &&
      this.m22 === 1 &&
      this.m12 === 0 &&
      this.m21 === 0 &&
      this.ox === 0 &&
      this.oy === 0
    );
  }

  /**
   * Setter property of m11
   */
  set m11(value: number) {
    this.values[0] = value;
  }

  /**
   * Setter property of m12
   */
  set m12(value: number) {
    this.values[1] = value;
  }

  /**
   * Setter property of m21
   */
  set m21(value: number) {
    this.values[2] = value;
  }

  /**
   * Setter property of m22
   */
  set m22(value: number) {
    this.values[3] = value;
  }

  /**
   * Setter property of offset x
   */
  set ox(value: number) {
    this.values[4] = value;
  }

  /**
   * Setter property of offset y
   */
  set oy(value: number) {
    this.values[5] = value;
  }

  public static fromDOM(dom: DOMMatrix) {
    return new this(dom.a, dom.c, dom.b, dom.d, dom.e, dom.f);
  }

  /**
   * Translate current coordinate system by given offset.
   * @param x - X value of the movement.
   * @param y - Y value of the movement.
   * @returns Itself which got moved.
   */
  public translate(x: number, y: number): this {
    this.ox += x;
    this.oy += y;
    return this;
  }

  /**
   * Scales the whole scene. Bigger the value is, Bigger the entities show.
   * @param value - Scale ratio of both direction.
   * @returns Itself which got scaled.
   */
  public scale(value: number): this;
  /**
   * Scales the whole scene. Bigger the value is, Bigger the objects show.
   * @param x - Scale ratio of X direction.
   * @param y - Scale ratio of Y direction.
   * @returns Itself which got scaled.
   */
  public scale(x: number, y: number): this;
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

  /**
   * Apply linear transformation.
   * @param m11 - Element of the matrix at `(1, 1)`.
   * @param m12 - Element of the matrix at `(1, 2)`.
   * @param m21 - Element of the matrix at `(2, 1)`.
   * @param m22 - Element of the matrix at `(2, 2)`.
   * @param ox - Element of the matrix at `(3, 1)`.
   * @param oy - Element of the matrix at `(3, 2)`.
   * @returns Itself which got applied.
   */
  public linear(
    m11: number,
    m12: number,
    m21: number,
    m22: number,
    ox: number,
    oy: number
  ): this {
    this.values = [
      m11 * this.m11 + m12 * this.m21,
      m11 * this.m12 + m12 * this.m22,
      m21 * this.m11 + m22 * this.m21,
      m21 * this.m12 + m22 * this.m22,
      m11 * this.ox + m12 * this.oy + ox,
      m21 * this.ox + m22 * this.oy + oy,
    ];
    return this;
  }

  /**
   * Rotate the camera countclockwise.
   * @param angle - The rotation angle you want. (in *degrees*)
   * @returns Itself which got rotated.
   */
  public rotate(angle: number): this {
    angle = (angle * Math.PI) / 180;
    const sinValue = Math.sin(angle);
    const cosValue = Math.cos(angle);
    return this.linear(cosValue, sinValue, -sinValue, cosValue, 0, 0);
  }

  /**
   * Apply transform to the gien coordinate values.
   * @param x - X value of the coordinate.
   * @param y - Y value of the coordinate.
   * @returns Actual coordinate values your coordinate will appear at.
   */
  public apply(x: number | Vector2D, y?: number): Vector2D {
    let v: Vector2D;
    if (x instanceof Vector2D) {
      v = x;
      y = x.Y;
      x = x.X;
      v.X = this.m11 * x + this.m12 * y + this.ox;
      v.Y = this.m21 * x + this.m22 * y + this.oy;
    } else if (y !== undefined) {
      v = new Vector2D(
        this.m11 * x + this.m12 * y + this.ox,
        this.m21 * x + this.m22 * y + this.oy
      );
    } else {
      throw new Error(
        "Transform#apply method requires two number parameters or one Vector2D."
      );
    }
    return v;
  }

  /**
   * Multiply given transform to this transform. A = AB where this is A and given param is B.
   * @param B - X value of the coordinate.
   * @returns this transform after transformation.
   */
  public multiply(B: Transform): this {
    return this.linear(...B.values);
  }

  /**
   * Invert this matrix if invertible.
   * @returns this transform.
   */
  public invert() {
    const det = this.Determinant;
    if (det === 0) throw new Error("This transform is not invertible");
    const m11 = this.m22 / det;
    const m12 = (this.m12 * -1) / det;
    const ox = (this.m12 * this.oy - this.m22 * this.ox) / det;
    const m21 = (this.m21 * -1) / det;
    const m22 = this.m11 / det;
    const oy = ((this.m11 * this.oy - this.m21 * this.ox) * -1) / det;

    this.m11 = m11;
    this.m12 = m12;
    this.ox = ox;
    this.m21 = m21;
    this.m22 = m22;
    this.oy = oy;
    return this;
  }

  /**
   * Skews the sprite.
   * @param x_slope - How much you want to skew to X-axis.
   * @param y_slope - How much you want to skew to Y-axis.
   * @returns Itself skewed.
   */
  public skew(x_slope: number = 0, y_slope: number = 0): this {
    this.linear(1, x_slope, y_slope, 1, 0, 0);
    return this;
  }

  /**
   * Makes a copy of this transform.
   * @returns a copy of this matrix
   */
  public copy(): Transform {
    return new Transform(...this.values);
  }

  /**
   * [`DOMMatrix`]: https://developer.mozilla.org/en-US/docs/Web/API/DOMMatrix
   * [`DOMMatrix`] getter method.
   * @returns [`DOMMatrix`] object made from this values.
   */
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
}
