import { Vector2D } from "../vector";

export default class Entity {
  protected children: Entity[] = [];

  protected parent: Entity | null = null;

  private dimension: Vector2D = new Vector2D();

  private position: Vector2D = new Vector2D();

  public constructor(config: {
    dimension: Vector2D | undefined;
    position: Vector2D | undefined;
  }) {
    if (config) {
      if (config.dimension) {
        this.dimension.X = config.dimension.X;
        this.dimension.Y = config.dimension.Y;
        // TODO: replace with vector copy method
      }
      if (config.position) {
        this.position.X = config.position.X;
        this.position.Y = config.position.Y;
        // TODO: replace with vector copy method
      }
    }
  }

  public get Dimension() {
    return this.dimension;
  }

  public get Parent() {
    return this.parent;
  }

  public get Position() {
    return this.position;
  }

  public get height() {
    return this.dimension.Y;
  }

  public get width() {
    return this.dimension.X;
  }

  protected get Children() {
    return this.children.slice();
  }

  public set Dimension(dimension: Vector2D) {
    this.dimension = dimension;
  }

  public set Position(pos: Vector2D) {
    this.position = pos;
  }

  public set height(value: number) {
    this.dimension.Y = value;
  }

  public set width(value: number) {
    this.dimension.X = value;
  }
}
