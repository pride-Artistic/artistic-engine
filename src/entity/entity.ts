import { Vector2D } from "src/vector";

export default class Entity {
  private dimension: Vector2D = new Vector2D();

  private parent: Entity | null = null;

  private position: Vector2D = new Vector2D();

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

  public set Dimension(dimension: Vector2D) {
    this.dimension = dimension;
  }

  public set Parent(entity: Entity | null) {
    this.parent = entity;
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
