import IEntity from "../entity/ientity";

type XYWH = IEntity | [number, number, number, number];

export default class Bitmap {
  protected image: ImageBitmapSource;

  protected options: ImageBitmapOptions | undefined;

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
    y: number = 0,
    w: number = 0,
    h: number = 0
  ): Promise<ImageBitmap> {
    if (Array.isArray(x)) {
      return this.getImageBitmap(...x);
    }
    if (typeof x === "object") {
      return this.getImageBitmap(x.X ?? 0, x.Y ?? 0, x.W ?? 0, x.H ?? 0);
    }
    if (x === undefined) {
      return createImageBitmap(this.image, this.options);
    }
    return createImageBitmap(this.image, x, y, w, h, this.options);
  }

  public async createImageBitmapList(
    coordinates: IEntity[]
  ): Promise<ImageBitmap[]> {
    const promises: Promise<ImageBitmap>[] = [];
    for (const c of coordinates) {
      promises.push(this.getImageBitmap(c));
    }
    return Promise.all(promises);
  }
}
