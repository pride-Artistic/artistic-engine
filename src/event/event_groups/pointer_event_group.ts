import { EventGroup } from "..";
import Engine from "../../engine";
import { Sprite } from "../../sprite";
import { Transform } from "../../transform";
import { Vector2D } from "../../vector";
// import { Transform } from "../../transform";

export interface IPointerListener {
  TouchRegistered: boolean;
  RecieveEventsOutOfBound: boolean;
  onTouch(e: PointerEvent): boolean;
}

type PointerListener = IPointerListener & Sprite;

export class PointerEventGroup extends EventGroup {
  protected engine: Engine;

  protected iTouchListeners: PointerListener[] = [];

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
      for (const touchListener of this.iTouchListeners) {
        if (!touchListener.TouchRegistered) continue;
        if (!touchListener.RecieveEventsOutOfBound) {
          engine.Camera.copyTo(tempTransform);
          tempVector.X = touchListener.AbsoluteX;
          tempVector.Y = touchListener.AbsoluteY;
          tempTransform
            .translate(touchListener.AbsoluteX, touchListener.AbsoluteY)
            .multiply(touchListener.Transform)
            .invert();
          const modifiedPointer = tempTransform.apply(event.x, event.y);

          // is point inside given area
          if (
            modifiedPointer.X < 0 ||
            modifiedPointer.Y < 0 ||
            modifiedPointer.X > touchListener.Width ||
            modifiedPointer.Y > touchListener.Height
          ) {
            continue;
          }
        }

        if (touchListener.onTouch(event)) return;
      }
    });
  }

  public registerTouchListener(iTouchListener: PointerListener) {
    // TODO: arrange listeners to meet sequence between entities.
    // top sprites will control whether to allow event to be triggered on lower sprites.
    this.iTouchListeners.push(iTouchListener);
    // this.engine.Camera.multiply(iTouchListener.Transform);
  }

  public setListenSequenceFirstInFirstTrigger(fift: boolean) {
    this.fift = fift;
  }

  public override setListener(): void {
    throw new Error("Directly modifying pointer listener is forbidden");
  }
}
