import Vector from "./vector";
export default class Vector4D extends Vector {
    constructor(x?: number, y?: number, z?: number, w?: number);
    get X(): number;
    get Y(): number;
    get Z(): number;
    get W(): number;
    set X(x: number);
    set Y(y: number);
    set Z(z: number);
    set W(w: number);
}
