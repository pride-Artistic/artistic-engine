import { Vector2D } from "../vector";
import IEntity from "./ientity";
export default class Entity implements IEntity {
    protected children: Entity[];
    protected parent: Entity | null;
    private dimension;
    private position;
    constructor(config?: IEntity | undefined);
    get Position(): Vector2D;
    get X(): number;
    get Y(): number;
    get AbsoluteX(): number;
    get AbsoluteY(): number;
    get Dimension(): Vector2D;
    get W(): number;
    get H(): number;
    get Width(): number;
    get Height(): number;
    get Parent(): Entity | null;
    protected get Children(): Entity[];
    set Position(position: Vector2D);
    set X(x: number);
    set Y(y: number);
    set Dimension(dimension: Vector2D);
    set W(width: number);
    set H(height: number);
    set Width(width: number);
    set Height(height: number);
    /**
     * Creates parent-child relation between this entity and entities passed through the parameter.
     * If children passed already has a parent, the previous relation is overwritted.
     * z_index can be specified to configure rendering sequence between children.
     * @param children Single entity or an array of entities to attach.
     * @param z_index Index in array of all children in this entity. The higher gets renderd later.
     * @returns The position given child entity is put.
     */
    attachChildren(children: Entity[] | Entity, z_index?: number): number;
    /**
     * Removes parent-child relation between this entity and entities passed through the parameter.
     * @param children Single entity or an array of entities to dettach.
     */
    detachChildren(children: Entity[] | Entity): void;
    /**
     * Retrieves child index of the entity passed through the parameter in the children list of this entity.
     * If children passed is not child of this instance, an error is thrown.
     * @param child Single entity which require the index.
     * @returns The position of the given child entity.
     */
    getChildIndex(child: Entity): number;
    /**
     * Based on already existing parent-child relation, this method modifies the index of given child in the children list of this entity.
     * @param child Single entity to modify index.
     * @param z_index Index in array of children in this entity. The higher gets renderd later.
     * @returns The position given child entity is moved to.
     */
    setChildIndex(child: Entity, index: number): number;
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
    setParent(parent?: Entity | null): void;
}
