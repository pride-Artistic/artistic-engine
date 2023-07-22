import { EventGroup } from "..";
import Engine from "../../engine";
import { Sprite } from "../../sprite";
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
      for (const touchListener of this.iTouchListeners) {
        if (!touchListener.TouchRegistered) continue;
        if (!touchListener.RecieveEventsOutOfBound) {
          // TODO: very poor performance
          // making a copy on every pointer refresh is expensive.
          // suggest on making a copyTo method for transforms and reusing an instance
          const c = engine.Camera.copy();
          c.translate(touchListener.AbsoluteX, touchListener.AbsoluteY)
            .multiply(touchListener.Transform)
            .invert();
          const modifiedPointer = c.apply(event.x, event.y);
          // TODO: very poor performance
          // suggest  a applyto method for vector and reusing an instance

          // is point inside given area
          console.log(
            "raw",
            event.x,
            event.y,
            touchListener.X,
            touchListener.Y
          );
          console.log("cal", modifiedPointer.X, modifiedPointer.Y);
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
