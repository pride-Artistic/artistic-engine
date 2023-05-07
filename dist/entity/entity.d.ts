import { Vector2D } from "../vector";
import IEntity from "./ientity";
import TreeItem from "../treeitem";
export default class Entity extends TreeItem<Entity> implements IEntity {
    protected dimension: Vector2D;
    protected position: Vector2D;
    constructor(config?: IEntity | undefined);
    get Position(): Vector2D;
    get X(): number;
    get Y(): number;
    get Dimension(): Vector2D;
    get W(): number;
    get H(): number;
    get Width(): number;
    get Height(): number;
    get AbsoluteX(): number;
    get AbsoluteY(): number;
    set Position(position: Vector2D);
    set X(x: number);
    set Y(y: number);
    set Dimension(dimension: Vector2D);
    set W(width: number);
    set H(height: number);
    set Width(width: number);
    set Height(height: number);
}
