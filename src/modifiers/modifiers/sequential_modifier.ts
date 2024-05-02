import Modifier from "./modifier";

export default class SequentialModifier extends Modifier {
  protected modifiers: Modifier[];

  constructor(...modifiers: Modifier[]) {
    let totalDuration = 0;
    for (const modifier of modifiers) {
      totalDuration += modifier.Duration;
    }
    super(0, 1, totalDuration, () => {
      if (this.modifiers.length === 0) return;

      const currentModifier = this.modifiers[0];
      currentModifier.tick();

      if (currentModifier.Progress >= 1) {
        this.modifiers.shift();
        if (this.modifiers.length > 0) {
          this.modifiers[0].register(
            performance.now() - currentModifier.EndTime
          );
        }
      }
    });
    this.modifiers = modifiers;
  }

  public override get Progress(): number {
    if (this.duration === 0) return 1;
    const superProgress = super.Progress;
    if (this.modifiers.length === 1 && superProgress >= 1)
      return 0.9999999999999999;
    return superProgress;
  }

  public override register(offset: number = 0): void {
    super.register(offset);
    this.modifiers[0].register();
  }
}
