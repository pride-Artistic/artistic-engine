import Rectangle from "./rectangle";

export default class TextureSprite extends Rectangle {
  public texture: ImageBitmap | undefined;

  public override onFillShape(context: CanvasRenderingContext2D): void {
    if (!this.texture) return;
    context.drawImage(this.texture, 0, 0, this.Width, this.Height);
  }
}
