export default abstract class Modifier {
  private from: number;

  private diff: number;

  private duration: number;

  private elapsedTime = 0;

  private easeFunction: (progress: number) => number;

  constructor(
    from: number,
    to: number,
    duration: number,
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
    this.easeFunction = easeFunction ?? ((p) => p);
  }

  public get Progress() {
    return this.elapsedTime / this.duration;
  }

  public tick(elapsedTime) {
    this.elapsedTime += elapsedTime;
    this.modify(
      this.from + this.easeFunction(Math.min(this.Progress, 1)) * this.diff
    );
  }

  protected abstract modify(value: number);
}
