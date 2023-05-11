import { Sprite } from ".";

export default class TextureSprite extends Sprite {
  public texture: ImageBitmap;

  constructor(config: {
    X?: number;
    Y?: number;
    W?: number;
    H?: number;
    texture: ImageBitmap;
  }) {
    if (config.texture.width === 0 && config.texture.height === 0) {
      throw new Error("Texture provided is not loaded correctly");
    }
    if (config.W === undefined) config.W = config.texture.width;
    if (config.H === undefined) config.H = config.texture.height;
    super(config);
    this.texture = config.texture;
  }

  public onDraw(context: CanvasRenderingContext2D): void {
    if (!this.texture) return;
    context.drawImage(this.texture, 0, 0, this.Width, this.Height);
  }
}
