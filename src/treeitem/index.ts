type Constructor<T = any> = new (...args: any[]) => T;
type MixinApplyedInstance<T> = T & TreeItemMixinInstance<T>;

export declare class TreeItemMixinInstance<T> {
  protected children: MixinApplyedInstance<T>[];

  protected parent: MixinApplyedInstance<T>;

  public get Children(): MixinApplyedInstance<T>[];
  public get Parent(): MixinApplyedInstance<T>;

  attachChildren(
    children: MixinApplyedInstance<T>[] | MixinApplyedInstance<T>,
    z_index?: number
  ): number;
  detachChildren(
    children: MixinApplyedInstance<T>[] | MixinApplyedInstance<T>
  ): void;
  getChildIndex(child: MixinApplyedInstance<T>): number;
  setChildIndex(child: MixinApplyedInstance<T>, index: number): number;
  setParent(parent: MixinApplyedInstance<T> | null): void;
}

export function TreeItemMixin<MixinInstance = TreeItemMixinInstance<any>>(): {
  new (...a: any[]): MixinInstance;
} {
  class TreeItem {
    protected children: TreeItem[] = [];

    protected parent: TreeItem | null = null;

    public get Parent() {
      return this.parent;
    }

    public get Children() {
      return this.children.slice();
    }

    public attachChildren(
      children: TreeItem[] | TreeItem,
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
          let tempParent: TreeItem | null = this;
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

    public detachChildren(children: TreeItem[] | TreeItem) {
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

    public getChildIndex(child: TreeItem): number {
      return this.children.indexOf(child);
    }

    public setChildIndex(child: TreeItem, index: number): number {
      const currentIndex = this.getChildIndex(child);
      if (currentIndex === -1) {
        throw new Error("I AM NOT YOUR FATHER"); // todo: better error message?
      }
      this.children.splice(currentIndex, 1);
      const safeIndex = Math.max(0, Math.min(index, this.children.length));
      this.children.splice(safeIndex, 0, child);
      return safeIndex;
    }

    public setParent(parent: TreeItem | null = null) {
      parent?.attachChildren(this);
    }
  }
  return TreeItem as Constructor<MixinInstance>;
}
