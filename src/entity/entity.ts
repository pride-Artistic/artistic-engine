import { Vector2D } from "../vector";
import CanvasConfig from "../canvas_config";
import IEntity from "./ientity";
import { applyTreeItem } from "../treeitem";

export interface EntityConstructorConfig extends CanvasConfig {
  x?: number;
  y?: number;
}

class EntityPartialClass implements IEntity {
  protected dimension: Vector2D = new Vector2D();

  protected position: Vector2D = new Vector2D();

  public constructor(config?: IEntity | undefined) {
    if (config) {
      this.dimension.X = config.W ?? 0;
      this.dimension.Y = config.H ?? 0;
      this.position.X = config.X ?? 0;
      this.position.Y = config.Y ?? 0;
    }
  }

  public get Position() {
    return this.position;
  }

  public get X() {
    return this.position.X;
  }

  public get Y() {
    return this.position.Y;
  }

  public get Dimension() {
    return this.dimension;
  }

  public get W() {
    return this.dimension.X;
  }

  public get H() {
    return this.dimension.Y;
  }

  public get Width() {
    return this.dimension.X;
  }

  public get Height() {
    return this.dimension.Y;
  }

  public set Position(position: Vector2D) {
    this.position = position;
  }

  public set X(x: number) {
    this.position.X = x;
  }

  public set Y(y: number) {
    this.position.Y = y;
  }

  public set Dimension(dimension: Vector2D) {
    this.dimension = dimension;
  }

  public set W(width: number) {
    this.dimension.X = width;
  }

  public set H(height: number) {
    this.dimension.Y = height;
  }

  public set Width(width: number) {
    this.dimension.X = width;
  }

  public set Height(height: number) {
    this.dimension.Y = height;
  }
}

const BaseEntityClass = applyTreeItem(EntityPartialClass);

export class Entity extends BaseEntityClass {
  public get AbsoluteX(): number {
    const parentX = this.parent?.AbsoluteX ?? 0;
    return parentX + this.position.X;
  }

  public get AbsoluteY(): number {
    const parentY = this.parent?.AbsoluteY ?? 0;
    return parentY + this.position.Y;
  }
}
