export class TreeItem {
  protected children: this[] = [];

  protected parent: this | null = null;

  public get Parent() {
    return this.parent;
  }

  protected get Children() {
    return this.children.slice();
  }

  public attachChildren(
    children: this[] | this,
    z_index: number = Infinity
  ): number {
    let lastIndex: number = -1;
    if (Array.isArray(children)) {
      const safeIndex = Math.max(0, Math.min(z_index, this.children.length));
      for (let index = 0; index < children.length; index++) {
        lastIndex = this.attachChildren(children[index], safeIndex + index);
      }
    } else {
      let tempParent: this | null = this;
      while (tempParent !== null) {
        tempParent = this.parent;
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

  public detachChildren(children: this[] | this) {
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

  public getChildIndex(child: this): number {
    return this.children.indexOf(child);
  }

  public setChildIndex(child: this, index: number): number {
    const currentIndex = this.getChildIndex(child);
    if (currentIndex === -1) {
      throw new Error("I AM NOT YOUR FATHER"); // todo: better error message?
    }
    this.children.splice(currentIndex, 1);
    const safeIndex = Math.max(0, Math.min(index, this.children.length));
    this.children.splice(safeIndex, 0, child);
    return safeIndex;
  }

  public setParent(parent: this | null = null) {
    parent?.attachChildren(this);
  }
}
