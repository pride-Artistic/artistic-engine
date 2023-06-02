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

  public async getImageBitmap(): Promise<ImageBitmap>;
  public async getImageBitmap(xywh: XYWH): Promise<ImageBitmap>;
  public async getImageBitmap(
    x: number,
    y: number,
    w: number,
    h: number
  ): Promise<ImageBitmap>;
  public async getImageBitmap(
    x?: number | XYWH,
    y?: number,
    w?: number,
    h?: number
  ): Promise<ImageBitmap> {
    if (Array.isArray(x)) {
      return this.getImageBitmap(...x);
    } else if (typeof x != "number") {
      return this.getImageBitmap(x.X, x.Y, x.W, x.H);
    } else {
      const image =
        x === undefined
          ? await createImageBitmap(this.image, this.options)
          : await createImageBitmap(this.image, x, y, w, h, this.options);
      return image;
    }
  }

  public async *generateImageBitmap(
    func: (img: ImageBitmap) => [ImageBitmap, boolean]
  ): AsyncGenerator<ImageBitmap, void, void> {
    let image = await this.getImageBitmap();
    let cond: boolean = true;
    while (cond) {
      yield image;
      [image, cond] = func(image);
    }
  }
}
