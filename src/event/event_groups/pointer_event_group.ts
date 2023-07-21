import { EventGroup } from "..";
import Engine from "../../engine";
import { Sprite } from "../../sprite";
// import { Transform } from "../../transform";

interface IPointerListener {
  TouchRegistered: boolean;
  onTouch(e: PointerEvent): boolean;
}

type PointerListener = IPointerListener & Sprite;

export default class PointerEventGroup extends EventGroup {
  protected engine: Engine;

  protected iTouchListeners: PointerListener[] = [];

  protected childFirst: boolean = true;

  constructor(engine: Engine) {
    // Maybe we should give developers a chance to select targets for each event
    // Like: [target_for_keyup, target_for_keydown, target_for_keypress]
    super(
      [
        { event: "pointerover" },
        { event: "pointerenter" },
        { event: "pointerdown" },
        { event: "pointermove" },
        { event: "pointerup" },
        { event: "pointercancel" },
        { event: "pointerout" },
        { event: "pointerleave" },
      ],
      engine.Canvas
    );
    // gotpointercapture
    // lostpointercapture
    this.engine = engine;
  }

  public registerTouchListener(iTouchListener: PointerListener) {
    // TODO: arrange listeners to meet sequence between entities.
    // top sprites will control whether to allow event to be triggered on lower sprites.
    this.iTouchListeners.push(iTouchListener);
    // this.engine.Camera.multiply(iTouchListener.Transform);

    this.organizeListenerSequence();
  }

  public setListenSequenceChildToParent(childFirst: boolean) {
    this.childFirst = childFirst;
    this.organizeListenerSequence();
  }

  public override setListener(): void {
    throw new Error("Directly modifying pointer listener is forbidden");
  }

  private organizeListenerSequence() {
    // wow
    if (this.childFirst) {
      // hmm
    } else {
      // hmmmmm
    }
  }
}
