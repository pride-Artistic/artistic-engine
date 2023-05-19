import Transform from "./transform";

export default class ExtendedTransform extends Transform {
  /**
   * Move the camera left. (So the objects seems to move right.)
   * @param value - Distance to move.
   * @returns Itself which moved.
   */
  public left(value: number): this {
    this.translate(-value, 0);
    return this;
  }

  /**
   * Move the camera right. (So the objects seems to move left.)
   * @param value - Distance to move.
   * @returns Itself which moved.
   */
  public right(value: number): this {
    this.translate(value, 0);
    return this;
  }

  /**
   * Move the camera up. (So the objects seems to move down.)
   * @param value - Distance to move.
   * @returns Itself which moved.
   */
  public up(value: number): this {
    this.translate(0, -value);
    return this;
  }

  /**
   * Move the camera down. (So the objects seems to move up.)
   * @param value - Distance to move.
   * @returns Itself which moved.
   */
  public down(value: number): this {
    this.translate(0, value);
    return this;
  }

  /**
   * Shortcut of rotating 90 degrees clockwise.
   * @returns Itself rotated.
   */
  public rotate90(): this {
    this.rotate(Math.PI / 2);
    return this;
  }

  /**
   * Shortcut of rotating 180 degrees clockwise.
   * @returns Itself rotated.
   */
  public rotate180(): this {
    this.rotate(Math.PI);
    return this;
  }

  /**
   * Shortcut of rotating 270 degrees clockwise.
   * @returns Itself rotated.
   */
  public rotate270(): this {
    this.rotate((Math.PI * 3) / 2);
    return this;
  }

  /**
   * Shortcut of reflecting in the X axis.
   * @returns Itself reflected.
   */
  public XaxisReflect(): this {
    this.linear(1, 0, 0, -1, 0, 0);
    return this;
  }

  /**
   * Shortcut of reflecting in the Y axis.
   * @returns Itself reflected.
   */
  public YaxisReflect(): this {
    this.linear(-1, 0, 0, 1, 0, 0);
    return this;
  }

  /**
   * Shortcut of reflecting in the origin. (`(0, 0)`)
   * @returns Itself reflected.
   */
  public OriginReflect(): this {
    this.linear(-1, 0, 0, -1, 0, 0);
    return this;
  }
}
