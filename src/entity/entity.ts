import { Vector2D } from "../vector";

export default class Entity {
  protected children: Entity[] = [];

  protected parent: Entity | null = null;

  private dimension: Vector2D = new Vector2D();

  private position: Vector2D = new Vector2D();

  public constructor(config: {
    h: number | undefined;
    w: number | undefined;
    x: number | undefined;
    y: number | undefined;
  }) {
    if (config) {
      this.dimension.X = config.w ?? 0;
      this.dimension.Y = config.h ?? 0;
      this.position.X = config.x ?? 0;
      this.position.Y = config.y ?? 0;
    }
  }

  public get Dimension() {
    return this.dimension;
  }

  public get Height() {
    return this.dimension.Y;
  }

  public get Parent() {
    return this.parent;
  }

  public get Position() {
    return this.position;
  }

  public get Width() {
    return this.dimension.X;
  }

  protected get Children() {
    return this.children.slice();
  }

  public set Dimension(dimension: Vector2D) {
    this.dimension = dimension;
  }

  public set Height(value: number) {
    this.dimension.Y = value;
  }

  public set Position(pos: Vector2D) {
    this.position = pos;
  }

  public set Width(value: number) {
    this.dimension.X = value;
  }
}
