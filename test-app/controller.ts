import { KeyboardEventGroup } from "../src/event";

export function controller(engine: EventTarget) {
  const group = new KeyboardEventGroup(engine);
  group.setListener((event: Event) => {
    const e = <KeyboardEvent>event;
    if (e.type !== "keydown") return;
    console.log(e.code);
  });
  group.registerEvent();
}
