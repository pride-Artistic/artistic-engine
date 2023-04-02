export default class Modifier {
    private from;
    private diff;
    private duration;
    private startTime;
    private elapsedTime;
    private modifyFunction;
    private easeFunction;
    constructor(from: number, to: number, duration: number, modify: (value: number) => void, easeFunction?: (progress: number) => number);
    get Progress(): number;
    get EndTime(): number;
    register(offset?: number): void;
    tick(): void;
    protected modify(value: number): void;
}
