import { Sprite } from ".";
import IEntity from "../entity/ientity";

interface TextureConfig extends IEntity {
  texture?: ImageBitmap;
}

export default class TextureSprite extends Sprite {
  public texture: ImageBitmap | undefined;

  constructor(config: TextureConfig | undefined) {
    if (config?.texture == null) return;
    if (config.W === undefined) config.W = config.texture.width;
    if (config.H === undefined) config.H = config.texture.height;
    super(config);
    this.texture = config.texture;
  }

  public onDraw(context: CanvasRenderingContext2D, _delay: number): void {
    if (!this.texture) return;
    context.drawImage(this.texture, 0, 0, this.Width, this.Height);
  }
}
