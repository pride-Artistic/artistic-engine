import { Vector2D } from "../vector";
export default class Transform {
    private values;
    constructor(m11?: number, m12?: number, m21?: number, m22?: number, ox?: number, oy?: number);
    /**
     * Getter property of m11
     */
    get m11(): number;
    /**
     * Getter property of m12
     */
    get m12(): number;
    /**
     * Getter property of m21
     */
    get m21(): number;
    /**
     * Getter property of m22
     */
    get m22(): number;
    /**
     * Getter property of offset x
     */
    get ox(): number;
    /**
     * Getter property of offset y
     */
    get oy(): number;
    get Determinant(): number;
    get isInvertible(): boolean;
    get isIdentity(): boolean;
    /**
     * Setter property of m11
     */
    set m11(value: number);
    /**
     * Setter property of m12
     */
    set m12(value: number);
    /**
     * Setter property of m21
     */
    set m21(value: number);
    /**
     * Setter property of m22
     */
    set m22(value: number);
    /**
     * Setter property of offset x
     */
    set ox(value: number);
    /**
     * Setter property of offset y
     */
    set oy(value: number);
    static fromDOM(dom: DOMMatrix): Transform;
    /**
     * Translate current coordinate system by given offset.
     * @param x - X value of the movement.
     * @param y - Y value of the movement.
     * @returns Itself which got moved.
     */
    translate(x: number, y: number): this;
    /**
     * Scales the whole scene. Bigger the value is, Bigger the entities show.
     * @param value - Scale ratio of both direction.
     * @returns Itself which got scaled.
     */
    scale(value: number): this;
    /**
     * Scales the whole scene. Bigger the value is, Bigger the objects show.
     * @param x - Scale ratio of X direction.
     * @param y - Scale ratio of Y direction.
     * @returns Itself which got scaled.
     */
    scale(x: number, y: number): this;
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
    linear(m11: number, m12: number, m21: number, m22: number, ox: number, oy: number): this;
    /**
     * Rotate the camera countclockwise.
     * @param angle - The rotation angle you want. (in *degrees*)
     * @returns Itself which got rotated.
     */
    rotate(angle: number, pointX?: number, pointY?: number): this;
    /**
     * Apply transform to the gien coordinate values.
     * @param x - X value of the coordinate.
     * @param y - Y value of the coordinate.
     * @returns Actual coordinate values your coordinate will appear at.
     */
    apply(x: number | Vector2D, y?: number): Vector2D;
    /**
     * Multiply given transform to this transform. A = AB where this is A and given param is B.
     * @param B - X value of the coordinate.
     * @returns this transform after transformation.
     */
    multiply(B: Transform): this;
    /**
     * Invert this matrix if invertible.
     * @returns this transform.
     */
    invert(): this;
    /**
     * Skews the sprite.
     * @param x_slope - How much you want to skew to X-axis.
     * @param y_slope - How much you want to skew to Y-axis.
     * @returns Itself skewed.
     */
    skew(x_slope?: number, y_slope?: number): this;
    /**
     * Makes a copy of this transform.
     * @returns a copy of this matrix
     */
    copy(): Transform;
    /**
     * [`DOMMatrix`]: https://developer.mozilla.org/en-US/docs/Web/API/DOMMatrix
     * [`DOMMatrix`] getter method.
     * @returns [`DOMMatrix`] object made from this values.
     */
    toDOM(): DOMMatrix;
}
