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
    return this.children;
  }

  public set Dimension(dimension: Vector2D) {
    this.dimension = dimension;
  }

  public set Height(value: number) {
    this.dimension.Y = value;
  }

  public set Position(position: Vector2D) {
    this.position = position;
  }

  public set Width(value: number) {
    this.dimension.X = value;
  }

  public attachChildren(
    children: Entity[] | Entity,
    z_index: number = Infinity
  ): number {
    const safeIndex = Math.max(0, Math.min(z_index, this.Children.length));
    let lastIndex: number = -1;
    if (Array.isArray(children)) {
      for (let index = 0; index < children.length; index++) {
        lastIndex = this.attachChildren(children[index], safeIndex + index);
      }
    } else {
      let duplicateCount = 0;
      for (let index = this.Children.length - 1; index >= 0; index--) {
        if (this.Children[index] === children) {
          this.Children.splice(index, 1);
          duplicateCount++;
        }
      }
      lastIndex = safeIndex - duplicateCount;
      this.Children.splice(lastIndex, 0, children);
      children.parent = this;
    }
    return lastIndex; // if returns -1, empty array has been input.
  }

  public detachChildren(children: Entity[] | Entity) {
    if (Array.isArray(children)) {
      for (const child of children) {
        this.detachChildren(child);
      }
    } else {
      const index = this.Children.indexOf(children);
      if (index > -1) {
        this.Children.splice(index, 1);
        children.parent = null;
      }
    }
  }

  public setParent(parent: Entity | null = null) {
    this.parent?.detachChildren(this);
    parent?.attachChildren(this);
  }
}
