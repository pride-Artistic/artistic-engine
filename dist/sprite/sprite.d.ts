import { Entity } from "../entity";
import { Camera } from "../camera";
import IDrawable from "./idrawable";
export default abstract class Sprite extends Entity implements IDrawable {
    private region;
    private transform;
    /**
     * Getter property for transform.
     * @returns The matrix transform applied to this sprite.
     */
    get Transform(): Camera;
    /**
     * Getter property for region.
     * @returns The drawing region this sprite is indicating. Sprites are clipped by their region.
     * @see [CanvasRenderingContext2D#clip](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clip)
     */
    get Region(): Entity | undefined;
    /**
     * @returns Boolean that determines whether the region of this sprite indicates it self.
     * @see {@link Region}
     */
    get isSelfRegion(): boolean;
    /**
     * Setter property for transform.
     */
    set Transform(trnasform: Camera);
    /**
     * Setter property for region.
     */
    set Region(region: Entity | undefined);
    /**
     * @inheritdoc
     */
    readonly draw: (context: CanvasRenderingContext2D, delay: number) => void;
    /**
     * Pre-clip tasks performed for canvas context reset.
     * this method is called automatically by engine if attached.
     * @param context Canvas context to perform reset on.
     * @param delay time in milliseconds passed from the previous frame call.
     */
    beforeClip(context: CanvasRenderingContext2D, delay: number): void;
    /**
     * Post-restore tasks performed for canvas context restore.
     * this method is called automatically by engine if attached.
     * @param context Canvas context to perform reset on.
     * @param delay time in milliseconds passed from the previous frame call.
     */
    afterRestore(context: CanvasRenderingContext2D, delay: number): void;
    resetTransform(): void;
    /**
     * Render tasks performed for canvas context.
     * this method is called automatically by engine if attached.
     * @param context Canvas context to perform reset on.
     * @param delay time in milliseconds passed from the previous frame call.
     */
    abstract onDraw(context: CanvasRenderingContext2D, delay: number): void;
}
