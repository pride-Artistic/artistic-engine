export default abstract class Vector {
  protected readonly size: number;

  protected values: number[];

  constructor(...values: number[]) {
    this.values = [...values];
    this.size = values.length;
  }

  public get Size() {
    return this.size;
  }

  public copy<T extends Vector>(to: T, force: boolean = false): T {
    if (this.size > to.size && !force) {
      throw new Error(
        `Copying vector of size ${this.size} to ${to.size} will cause data loss.\nInclude force option if intended.`
      );
    } else {
      to.overwrite(this.values);
      return to;
    }
  }

  private overwrite(values: number[]) {
    let counter = 0;
    this.values = this.values.map(function () {
      const newValue = values[counter++];
      if (newValue) return newValue;
      else return 0;
    });
  }
}
