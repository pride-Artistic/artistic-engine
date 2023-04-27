import Modifier from "./modifier";
export default class ConcurrentModifier extends Modifier {
    protected modifiers: Modifier[];
    constructor(modifier: Modifier, ...modifiers: Modifier[]);
    get Progress(): number;
    register(): void;
    tick(): void;
}
