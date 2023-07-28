import { EventGroup } from "..";
import Engine from "../../engine";
import { Sprite } from "../../sprite";
import { Transform } from "../../transform";
import { Vector2D } from "../../vector";
// import { Transform } from "../../transform";

export interface IPointerListener {
  PointerRegistered: boolean;
  RecieveEventsOutOfBound: boolean;
  onPointer(e: PointerEvent): boolean;
}

type PointerListener = IPointerListener & Sprite;

export class PointerEventGroup extends EventGroup {
  protected engine: Engine;

  protected iPointerListeners: PointerListener[] = [];

  protected fift: boolean = true;

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

    super.setListener((e: Event) => {
      const event = <PointerEvent>e;
      const tempVector = new Vector2D();
      const tempTransform = new Transform();
      for (const pointerListener of this.iPointerListeners) {
        if (!pointerListener.PointerRegistered) continue;
        if (!pointerListener.RecieveEventsOutOfBound) {
          engine.Camera.copyTo(tempTransform);
          tempVector.X = event.x;
          tempVector.Y = event.y;
          tempTransform
            .translate(pointerListener.AbsoluteX, pointerListener.AbsoluteY)
            .multiply(pointerListener.Transform)
            .invert();
          const modifiedPointer = tempTransform.apply(tempVector);

          // is point inside given area
          if (
            modifiedPointer.X < 0 ||
            modifiedPointer.Y < 0 ||
            modifiedPointer.X > pointerListener.Width ||
            modifiedPointer.Y > pointerListener.Height
          ) {
            continue;
          }
        }

        if (pointerListener.onPointer(event)) return;
      }
    });
  }

  public registerPointerListener(iPointerListener: PointerListener) {
    // TODO: arrange listeners to meet sequence between entities.
    // top sprites will control whether to allow event to be triggered on lower sprites.
    this.iPointerListeners.push(iPointerListener);
    // this.engine.Camera.multiply(iPointerListener.Transform);
  }

  public unregisterPointerListener(iPointerListener: PointerListener) {
    const idx = this.iPointerListeners.indexOf(iPointerListener);
    if (idx === -1) return;
    this.iPointerListeners.splice(idx, 1);
  }

  public setListenSequenceFirstInFirstTrigger(fift: boolean) {
    this.fift = fift;
  }

  public override setListener(): void {
    throw new Error("Directly modifying pointer listener is forbidden");
  }
}
