export default class Modifier {
    private from;
    private diff;
    private duration;
    private startTime;
    private elapsedTime;
    private modifyFunction;
    private easeFunction;
    constructor(from: number, to: number, duration: number, modify: (value: number) => void, easeFunction?: (progress: number) => number);
    /**
     * Progress of times elapsed since registration of this modifier in scale of 1.
     */
    get Progress(): number;
    /**
     * UNIX timestamp of time when the modifier will end with progress 0.
     */
    get EndTime(): number;
    /**
     * Set the call time as the start time of this modifier and fire {@link tick} for every rendering cycle.
     * Offset can be provided to delay/prompt start time from the call time.
     * @param offset Offset applied to start time on call.
     */
    register(offset?: number): void;
    /**
     * @internal
     */
    tick(): void;
    protected modify(value: number): void;
}
