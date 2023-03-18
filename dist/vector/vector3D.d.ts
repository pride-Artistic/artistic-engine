import Vector from "./vector";
export default class Vector3D extends Vector {
    constructor(x?: number, y?: number, z?: number);
    get X(): number;
    get Y(): number;
    get Z(): number;
    set X(x: number);
    set Y(y: number);
    set Z(z: number);
}
