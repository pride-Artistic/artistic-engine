export default class Camera {
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
    /**
     * Moves the position of this camera.
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
     * @returns Itself which got applied.
     */
    linear(m11: number, m12: number, m21: number, m22: number): this;
    /**
     * Rotate the camera countclockwise.
     * @param angle - The rotation angle you want. (in *degrees*)
     * @returns Itself which got rotated.
     */
    rotate(angle: number): this;
    /**
     * Calculate the coordinate value where a original coordinate will actually appear in the canvas.
     * @param x - X value of the coordinate.
     * @param y - Y value of the coordinate.
     * @returns Actual coordinate values your coordinate will appear at.
     */
    calc(x: number, y: number): [number, number];
    /**
     * [`DOMMatrix`]: https://developer.mozilla.org/en-US/docs/Web/API/DOMMatrix
     * [`DOMMatrix`] getter method.
     * @returns [`DOMMatrix`] object made from this values.
     */
    toDOM(): DOMMatrix;
    /**
     * Apply this transformation to your canvas.
     * @param canvas - Your canvas you want to apply this.
     * @returns [`DOMMatrix`](https://developer.mozilla.org/en-US/docs/Web/API/DOMMatrix) object of your canvas' transformation before applying this transformation.
     */
    apply(canvas: CanvasRenderingContext2D): DOMMatrix;
    /**
     * Invert this matrix if invertible.
     * @returns this transform.
     */
    invert(): this;
}
