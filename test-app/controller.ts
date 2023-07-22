import { KeyboardEventGroup } from "../src/event";

export function controller(target: EventTarget) {
  const group = new KeyboardEventGroup(target);
  group.setListener((event: Event) => {
    const e = <KeyboardEvent>event;
    if (e.type !== "keydown") return;
    console.log(e.code);
  });
  group.registerEvent();
}
