import { EventGroup } from "..";

export default class KeyboardEventGroup extends EventGroup {
  constructor(target: EventTarget, listener: (e: Event) => unknown) {
    // Maybe we should give developers a chance to select targets for each event
    // Like: [target_for_keyup, target_for_keydown, target_for_keypress]
    super(
      new Map([
        ["keyup", new Set([target])],
        ["keydown", new Set([target])],
        ["keypress", new Set([target])],
      ]),
      listener
    );
  }
}
