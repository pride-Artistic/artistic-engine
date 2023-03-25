import Camera from "./camera";

export default class ExtendedCamera extends Camera {
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
}
