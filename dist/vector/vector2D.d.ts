import Vector from "./vector";
export default class Vector2D extends Vector {
    constructor(x?: number, y?: number);
    get X(): number;
    get Y(): number;
    set X(x: number);
    set Y(y: number);
}
