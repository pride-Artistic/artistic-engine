import { EventGroup } from "..";
import Engine from "../../engine";
import { Sprite } from "../../sprite";
// import { Transform } from "../../transform";

interface ITouchListener {
  onTouch(e: PointerEvent): boolean;
}

type TouchListener = ITouchListener & Sprite;

export default class PointerEventGroup extends EventGroup {
  protected engine: Engine;

  protected iTouchListeners: TouchListener[] = [];

  constructor(engine: Engine, defaultTarget: EventTarget) {
    // Maybe we should give developers a chance to select targets for each event
    // Like: [target_for_keyup, target_for_keydown, target_for_keypress]
    super([{ event: "keyup" }, { event: "keydown" }], defaultTarget);
    // pointerover
    // pointerenter
    // pointerdown
    // pointermove
    // pointerup
    // pointercancel
    // pointerout
    // pointerleave
    // gotpointercapture
    // lostpointercapture
  }

  public registerTouchListener(iTouchListener: TouchListener) {
    // TODO: arrange listeners to meet sequence between entities.
    // top sprites will control whether to allow event to be triggered on lower sprites.
    this.iTouchListeners.push(iTouchListener);
    // this.engine.Camera.multiply(iTouchListener.Transform);
  }

  public setListener(): void {
    throw new Error("Directly modifying pointer listener is forbidden");
  }
}
