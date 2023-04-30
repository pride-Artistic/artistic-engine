type Tree<T> = T & TreeItem<T>;
export default abstract class TreeItem<T> {
    protected children: Tree<T>[];
    protected parent: Tree<T> | null;
    get Parent(): Tree<T> | null;
    get Children(): Tree<T>[];
    /**
     * Creates parent-child relation between this entity and entities passed through the parameter.
     * If children passed already has a parent, the previous relation is overwritted.
     * z_index can be specified to configure rendering sequence between children.
     * @param children Single entity or an array of entities to attach.
     * @param z_index Index in array of all children in this entity. The higher gets renderd later.
     * @returns The position given child entity is put.
     */
    attachChildren(this: Tree<T>, children: Tree<T>[] | Tree<T>, z_index?: number): number;
    /**
     * Removes parent-child relation between this entity and entities passed through the parameter.
     * @param children Single entity or an array of entities to dettach.
     */
    detachChildren(children: Tree<T>[] | Tree<T>): void;
    /**
     * Retrieves child index of the entity passed through the parameter in the children list of this entity.
     * If children passed is not child of this instance, an error is thrown.
     * @param child Single entity which require the index.
     * @returns The position of the given child entity.
     */
    getChildIndex(child: Tree<T>): number;
    /**
     * Based on already existing parent-child relation, this method modifies the index of given child in the children list of this entity.
     * @param child Single entity to modify index.
     * @param z_index Index in array of children in this entity. The higher gets renderd later.
     * @returns The position given child entity is moved to.
     */
    setChildIndex(child: Tree<T>, index: number): number;
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
    setParent(this: Tree<T>, parent?: Tree<T> | null): void;
}
export {};
