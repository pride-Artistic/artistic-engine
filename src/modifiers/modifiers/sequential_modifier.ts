import Modifier from "./modifier";

export default class SequentialModifier extends Modifier {
  protected modifiers: Modifier[];

  constructor(...modifiers: Modifier[]) {
    let totalDuration = 0;
    for (const modifier of modifiers) {
      totalDuration += modifier.Duration;
    }
    super(0, 1, totalDuration, () => {
      if (this.Progress === 1) return;

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
    return this.duration === 0 ? 1 : super.Progress;
  }

  public override register(offset: number = 0): void {
    super.register(offset);
    this.modifiers[0].register();
  }
}
