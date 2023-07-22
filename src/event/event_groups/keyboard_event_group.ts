import { EventGroup } from "..";

export default class KeyboardEventGroup extends EventGroup {
  constructor(defaultTarget: EventTarget) {
    // Maybe we should give developers a chance to select targets for each event
    // Like: [target_for_keyup, target_for_keydown, target_for_keypress]
    super([{ event: "keyup" }, { event: "keydown" }], defaultTarget);
  }
}
