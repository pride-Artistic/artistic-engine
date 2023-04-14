export default interface IDrawable {
  /**
   * Overall render tasks performed for canvas context specific to the sprite.
   * this method is called automatically by engine if attached.
   * @param context Canvas context to perform reset on.
   * @param delay time in milliseconds passed from the previous frame call.
   */
  draw(context: CanvasRenderingContext2D, delay: number): void;
}
