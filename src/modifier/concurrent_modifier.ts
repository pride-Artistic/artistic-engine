import Modifier from "./modifier";

export default abstract class ConcurrentModifier extends Modifier {
  protected modifiers: Modifier[];

  constructor(modifier: Modifier, ...modifiers: Modifier[]) {
    super(0, 1, 1, () => {});
    this.modifiers = [modifier, ...modifiers];
  }

  public override get Progress(): number {
    return this.modifiers.length === 0 ? 1 : 0;
  }

  public override register(): void {
    for (const modifier of this.modifiers) {
      modifier.register();
    }
  }

  public override tick(): void {
    if (this.Progress === 1) return;
    for (const modifier of this.modifiers) {
      if (modifier.Progress < 1) modifier.tick();
      else {
        this.modifiers = this.modifiers.filter((m) => m === modifier);
      }
    }
  }
}
