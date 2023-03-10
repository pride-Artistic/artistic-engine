import { Vector2D } from "../vector";
import IEntity from "./ientity";

export default class Entity implements IEntity {
  protected children: Entity[] = [];

  protected parent: Entity | null = null;

  private dimension: Vector2D = new Vector2D();

  private position: Vector2D = new Vector2D();

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

  /**
   * Creates parent-child relation between this entity and entities passed through the parameter.
   * If children passed already has a parent, the previous relation is overwritted.
   * z_index can be specified to configure rendering sequence between children.
   * @param children Single entity or an array of entities to attach.
   * @param z_index Index in array of all children in this entity. The higher gets renderd later.
   * @returns The position given child entity is put.
   */
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
      for (
        let tempParent: Entity | null = this;
        tempParent !== null;
        tempParent = tempParent.parent
      ) {
        if (tempParent === children) {
          throw new Error("Loop of parent-child relationships detected.");
        }
      }
      children.parent?.detachChildren(children);
      // TODO: Maybe good if there's option which decides
      //       whether it detaches and re-attaches or throws error
      this.children.push(children);
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
    const currentIndex = this.getChildIndex(child);
    if (currentIndex === -1) {
      throw new Error("I AM NOT YOUR FATHER"); // todo: better error message?
    }
    this.children.splice(currentIndex, 1);
    const safeIndex = Math.max(0, Math.min(index, this.children.length));
    this.children.splice(safeIndex, 0, child);
    return safeIndex;
  }

  public setParent(parent: Entity | null = null) {
    if (parent == null) {
      this.parent?.detachChildren(this);
    } else {
      parent.attachChildren(this);
    }
  }
}
