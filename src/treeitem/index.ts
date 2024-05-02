type Tree<T> = T & TreeItem<T>;

export default abstract class TreeItem<T> {
  protected children: Tree<T>[] = [];

  protected parent: Tree<T> | null = null;

  public get Root() {
    let tempItem: TreeItem<T> = this;
    while (tempItem.Parent != null) {
      tempItem = tempItem.Parent;
    }
    return tempItem;
  }

  public get Parent() {
    return this.parent;
  }

  public get Children() {
    return this.children.slice();
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
    this: Tree<T>,
    children: Tree<T>[] | Tree<T>,
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
        let tempParent: Tree<T> | null = this;
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

  /**
   * Removes parent-child relation between this entity and entities passed through the parameter.
   * @param children Single entity or an array of entities to dettach.
   */
  public detachChildren(children: Tree<T>[] | Tree<T>) {
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

  /**
   * Retrieves child index of the entity passed through the parameter in the children list of this entity.
   * If children passed is not child of this instance, an error is thrown.
   * @param child Single entity which require the index.
   * @returns The position of the given child entity.
   */
  public getChildIndex(child: Tree<T>): number {
    return this.children.indexOf(child);
  }

  /**
   * Based on already existing parent-child relation, this method modifies the index of given child in the children list of this entity.
   * @param child Single entity to modify index.
   * @param z_index Index in array of children in this entity. The higher gets renderd later.
   * @returns The position given child entity is moved to.
   */
  public setChildIndex(child: Tree<T>, index: number): number {
    const currentIndex = this.getChildIndex(child);
    if (currentIndex === -1) {
      throw new Error("I AM NOT YOUR FATHER"); // todo: better error message?
    }
    this.children.splice(currentIndex, 1);
    const safeIndex = Math.max(0, Math.min(index, this.children.length));
    this.children.splice(safeIndex, 0, child);
    return safeIndex;
  }

  /**
   * Alias of attachChildren. this entity is dettached from parent if null is passed.
   * @example
   * The following two linese of code means exactly same.
   * ```ts
   * A.setParent(B);
   * B.attachChildren(A);
   * ```
   * @param parent parent instance to set as parent of this entity.
   */
  public setParent(this: Tree<T>, parent: Tree<T> | null = null) {
    if (parent == null) {
      this.parent?.detachChildren(this);
    } else {
      parent.attachChildren(this);
    }
  }
}
