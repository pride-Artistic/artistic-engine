import { Vector2D } from "../vector";
import CanvasConfig from "../canvas_config";

export interface EntityConstructorConfig extends CanvasConfig {
  x?: number;
  y?: number;
}

export class Entity {
  protected children: Entity[] = [];

  protected parent: Entity | null = null;

  private dimension: Vector2D = new Vector2D();

  private position: Vector2D = new Vector2D();

  public constructor(config: EntityConstructorConfig | undefined = undefined) {
    if (config) {
      this.dimension.X = config.w ?? 0;
      this.dimension.Y = config.h ?? 0;
      this.position.X = config.x ?? 0;
      this.position.Y = config.y ?? 0;
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

  public get AbsoluteX(): number {
    const parentX = this.parent?.AbsoluteX ?? 0;
    return parentX + this.position.X;
  }

  public get AbsoluteY(): number {
    const parentY = this.parent?.AbsoluteY ?? 0;
    return parentY + this.position.Y;
  }

  public get Dimension() {
    return this.dimension;
  }

  public get Height() {
    return this.dimension.Y;
  }

  public get Width() {
    return this.dimension.X;
  }

  public get Parent() {
    return this.parent;
  }

  protected get Children() {
    return this.children.slice();
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

  public set Height(height: number) {
    this.dimension.Y = height;
  }

  public set Width(width: number) {
    this.dimension.X = width;
  }

  public attachChildren(
    children: Entity[] | Entity,
    z_index: number = Infinity
  ): number {
    let lastIndex: number = -1;
    if (Array.isArray(children)) {
      const safeIndex = Math.max(0, Math.min(z_index, this.children.length));
      for (let index = 0; index < children.length; index++) {
        lastIndex = this.attachChildren(children[index], safeIndex + index);
      }
    } else {
      let tempParent: Entity | null = this;
      while (tempParent !== null) {
        tempParent = this.parent;
        if (tempParent === children) {
          throw new Error("Loop of parent-child relationships detected.");
        }
      }
      this.children.push(children);
      children.parent?.detachChildren(children);
      children.parent = this;
      lastIndex = this.setChildIndex(children, z_index);
    }
    return lastIndex; // if returns -1, empty array has been input.
  }

  public detachChildren(children: Entity[] | Entity) {
    if (Array.isArray(children)) {
      for (const child of children) {
        this.detachChildren(child);
      }
    } else {
      const index = this.children.indexOf(children);
      if (index > -1) {
        this.children.splice(index, 1);
        children.parent = null;
      }
    }
  }

  public getChildIndex(child: Entity): number {
    return this.children.indexOf(child);
  }

  public setChildIndex(child: Entity, index: number): number {
    const currentDepth = this.getChildIndex(child);
    if (currentDepth === -1) {
      throw new Error("I AM NOT YOUR FATHER"); // todo: better error message?
    }
    for (let idx = this.children.length - 1; idx >= 0; idx--) {
      if (this.children[idx] === child) {
        this.children.splice(idx, 1);
      }
    }
    const safeIndex = Math.max(0, Math.min(index, this.children.length));
    this.children.splice(safeIndex, 0, child);
    return safeIndex;
  }

  public setParent(parent: Entity | null = null) {
    parent?.attachChildren(this);
  }
}
