export default class Modifier {
  protected from: number;

  protected diff: number;

  protected duration: number;

  protected startTime = 0;

  protected elapsedTime = 0;

  private modifyFunction: (value: number) => void;

  private easeFunction: (progress: number) => number;

  constructor(
    from: number,
    to: number,
    duration: number,
    modify: (value: number) => void,
    easeFunction?: (progress: number) => number
  ) {
    if (Number.isNaN(from) || Math.abs(from) === Infinity)
      throw new Error(from + "is not a valid parameter for 'from' parameter.");
    if (Number.isNaN(to) || Math.abs(to) === Infinity)
      throw new Error(to + "is not a valid parameter for 'to' parameter.");
    if (Number.isNaN(duration) || duration === Infinity || duration <= 0) {
      throw new Error(
        duration + "is not a valid parameter for 'duration' parameter."
      );
    }

    this.from = from;
    this.diff = to - from;
    this.duration = duration;
    this.modifyFunction = modify;
    this.easeFunction = easeFunction ?? ((p) => p);
  }

  /**
   * Progress of times elapsed since registration of this modifier in scale of 1.
   */
  public get Progress() {
    return this.elapsedTime / this.duration;
  }

  /**
   * The duration of this modifier from start to end.
   */
  public get Duration() {
    return this.duration;
  }

  /**
   * UNIX timestamp of time when the modifier started with progress 0.
   */
  public get StartTime() {
    return this.startTime;
  }

  /**
   * UNIX timestamp of time when the modifier will end with progress 1.
   */
  public get EndTime() {
    return this.startTime + this.duration;
  }

  /**
   * Set the call time as the start time of this modifier and fire {@link tick} for every rendering cycle.
   * Offset can be provided to delay/prompt start time from the call time.
   * @param offset Offset applied to start time on call.
   */
  public register(offset: number = 0) {
    this.startTime = performance.now() + offset;
    this.elapsedTime = 0;
  }

  /**
   * @internal
   */
  public tick() {
    this.elapsedTime = performance.now() - this.startTime;
    const normalProgress = Math.min(this.Progress, 1);
    this.modify(this.from + this.easeFunction(normalProgress) * this.diff);
  }

  protected modify(value: number) {
    this.modifyFunction(value);
  }
}
