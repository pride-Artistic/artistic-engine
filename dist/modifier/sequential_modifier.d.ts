import Modifier from "./modifier";
export default class SequentialModifier extends Modifier {
    protected modifiers: Modifier[];
    constructor(modifier: Modifier, ...modifiers: Modifier[]);
    get Progress(): number;
    register(): void;
    tick(): void;
}
