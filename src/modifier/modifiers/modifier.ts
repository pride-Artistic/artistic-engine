export default class Modifier {
  private from: number;

  private diff: number;

  private duration: number;

  private startTime = 0;

  private elapsedTime = 0;

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
      throw new Error(from + "is not a valid  parameter for 'from' parameter.");
    if (Number.isNaN(to) || Math.abs(to) === Infinity)
      throw new Error(to + "is not a valid  parameter for 'to' parameter.");
    if (
      Number.isNaN(duration) ||
      Math.abs(duration) === Infinity ||
      duration <= 0
    ) {
      throw new Error(
        duration + "is not a valid  parameter for 'duration' parameter."
      );
    }

    this.from = from;
    this.diff = to - from;
    this.duration = duration;
    this.modifyFunction = modify;
    this.easeFunction = easeFunction ?? ((p) => p);
  }

  public get Progress() {
    return this.elapsedTime / this.duration;
  }

  public get EndTime() {
    return this.duration - this.elapsedTime;
  }

  public register(offset: number = 0) {
    this.startTime = Date.now() + offset;
    this.elapsedTime = 0;
  }

  public tick() {
    this.elapsedTime = Date.now() - this.startTime;
    this.modify(
      this.from + this.easeFunction(Math.min(this.Progress, 1)) * this.diff
    );
  }

  protected modify(value: number) {
    this.modifyFunction(value);
  }
}
