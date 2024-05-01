import Modifier from "./modifier";

export default class ConcurrentModifier extends Modifier {
  protected modifiers: Modifier[];

  constructor(...modifiers: Modifier[]) {
    let maxDuration = 0;
    for (const modifier of modifiers) {
      maxDuration = Math.max(modifier.Duration);
    }

    super(0, 1, maxDuration, () => {
      if (this.Progress === 1) return;

      let modifiersDone: number[] = [];
      for (let i = 0; i < this.modifiers.length; i++) {
        this.modifiers[i].tick();
        if (this.modifiers[i].Progress >= 1) {
          modifiersDone.push(i);
        }
      }

      modifiersDone = modifiersDone.reverse();
      for (const i of modifiersDone) {
        this.modifiers.splice(i, 1);
      }
    });
    this.modifiers = modifiers;
  }

  public override get Progress(): number {
    return this.duration === 0 ? 1 : super.Progress;
  }

  public override register(offset: number = 0): void {
    super.register(offset);
    for (const modifier of this.modifiers) {
      modifier.register();
    }
  }
}
