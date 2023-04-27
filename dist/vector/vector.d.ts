export default abstract class Vector {
    protected readonly size: number;
    protected values: number[];
    constructor(...values: number[]);
    get Size(): number;
    copy<T extends Vector>(to: T, force?: boolean): T;
    isequal<T extends Vector>(other: T, precise?: number): boolean;
    shift(move?: number): this;
    private overwrite;
}
