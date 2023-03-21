import Modifier from "./modifier";

export default abstract class SequentialModifier extends Modifier {
  protected modifiers: Modifier[];

  constructor(modifier: Modifier, ...modifiers: Modifier[]) {
    super(0, 1, 1);
    this.modifiers = [modifier, ...modifiers];
  }

  public override get Progress(): number {
    return this.modifiers.length === 0 ? 1 : 0;
  }

  public override register(): void {
    this.modifiers[0].register();
  }

  public override tick(): void {
    if (this.Progress === 1) return;
    const currentModifier = this.modifiers[0];
    if (currentModifier.Progress < 1) currentModifier.tick();
    else {
      const previousModifier = this.modifiers.shift();
      this.modifiers[0]?.register(previousModifier?.EndTime);
    }
  }
}
