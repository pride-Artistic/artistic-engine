import Transform from "./transform";
export default class ExtendedTransform extends Transform {
    /**
     * Move the camera left. (So the objects seems to move right.)
     * @param value - Distance to move.
     * @returns Itself which moved.
     */
    left(value: number): this;
    /**
     * Move the camera right. (So the objects seems to move left.)
     * @param value - Distance to move.
     * @returns Itself which moved.
     */
    right(value: number): this;
    /**
     * Move the camera up. (So the objects seems to move down.)
     * @param value - Distance to move.
     * @returns Itself which moved.
     */
    up(value: number): this;
    /**
     * Move the camera down. (So the objects seems to move up.)
     * @param value - Distance to move.
     * @returns Itself which moved.
     */
    down(value: number): this;
    /**
     * Shortcut of rotating 90 degrees counterclockwise.
     * @returns Itself rotated.
     */
    rotate90(pointX?: number, pointY?: number): this;
    /**
     * Shortcut of rotating 18 degrees counterclockwise.
     * @returns Itself rotated.
     */
    rotate180(pointX?: number, pointY?: number): this;
    /**
     * Shortcut of rotating 270 degrees counterclockwise.
     * @returns Itself rotated.
     */
    rotate270(pointX?: number, pointY?: number): this;
    /**
     * Shortcut of reflecting in the X axis.
     * @returns Itself reflected.
     */
    XaxisReflect(): this;
    /**
     * Shortcut of reflecting in the Y axis.
     * @returns Itself reflected.
     */
    YaxisReflect(): this;
    /**
     * Shortcut of reflecting in the origin. (`(0, 0)`)
     * @returns Itself reflected.
     */
    OriginReflect(): this;
}
