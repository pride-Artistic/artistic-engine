import IEntity from "../entity/ientity";

type XYWH = IEntity | [number, number, number, number];

export default class Bitmap {
  protected image: ImageBitmapSource;

  protected options: ImageBitmapOptions;

  constructor(image: ImageBitmapSource) {
    this.image = image;
  }

  get Image() {
    return this.image;
  }

  set Options(options: ImageBitmapOptions) {
    this.options = options;
  }

  public async getImageBitmap(xywh: XYWH): Promise<ImageBitmap>;
  public async getImageBitmap(
    x: number,
    y: number,
    w: number,
    h: number
  ): Promise<ImageBitmap>;
  public async getImageBitmap(
    x: number | XYWH,
    y?: number,
    w?: number,
    h?: number
  ): Promise<ImageBitmap> {
    if (Array.isArray(x)) {
      return this.getImageBitmap(...x);
    } else if (typeof x != "number") {
      return this.getImageBitmap(x.X, x.Y, x.W, x.H);
    } else {
      const image = await createImageBitmap(
        this.image,
        x,
        y,
        w,
        h,
        this.options
      );
      return image;
    }
  }

  public async *generateImageBitmap(
    ...rects: XYWH[]
  ): AsyncGenerator<ImageBitmap, never, void> {
    let i = 0;
    while (true) {
      yield await this.getImageBitmap(rects[i++]);
      if (i >= rects.length) i -= rects.length;
    }
  }
}
