import { EventGroup } from "..";
import Engine from "../../engine";
import { Sprite } from "../../sprite";
import { Transform } from "../../transform";
import { Vector2D } from "../../vector";
// import { Transform } from "../../transform";

export interface IPointerListener {
  PointerRegistered?: boolean;
  onPointer(
    type: string,
    button: number,
    localX: number,
    localY: number,
    inBound: boolean,
    e: PointerEvent
  ): boolean;
}

type PointerListener = IPointerListener & Sprite;

export class PointerEventGroup extends EventGroup {
  protected engine: Engine;

  protected iPointerListeners: PointerListener[] = [];

  protected fift: boolean = true;

  private tempVector: Vector2D = new Vector2D();

  private baseTransform: Transform = new Transform();

  private tempTransform: Transform = new Transform();

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
      const { left, top } = this.engine.Canvas.getBoundingClientRect();
      this.baseTransform
        .reset()
        .translate(left, top)
        .multiply(this.engine.Camera);
      for (let idx = 0; idx < this.iPointerListeners.length; idx++) {
        const pointerListener =
          this.iPointerListeners[
            this.fift ? idx : this.iPointerListeners.length - idx - 1
          ];
        if (
          pointerListener.PointerRegistered === false ||
          pointerListener.Root !== this.engine.Scene
        ) {
          continue;
        }

        this.baseTransform.copyTo(this.tempTransform);
        this.tempVector.X = event.clientX;
        this.tempVector.Y = event.clientY;
        // TODO: https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
        this.tempTransform
          .translate(pointerListener.AbsoluteX, pointerListener.AbsoluteY)
          .multiply(pointerListener.Transform)
          .invert();

        this.tempTransform.apply(this.tempVector);

        const inBound =
          this.tempVector.X > 0 &&
          this.tempVector.Y > 0 &&
          this.tempVector.X < pointerListener.W &&
          this.tempVector.Y < pointerListener.H;

        if (
          pointerListener.onPointer(
            event.type,
            event.button,
            this.tempVector.X,
            this.tempVector.Y,
            inBound,
            event
          )
        ) {
          return;
        }
      }
    });
  }

  public registerPointerListener(...iPointerListeners: PointerListener[]) {
    // TODO: arrange listeners to meet sequence between entities.
    // top sprites will control whether to allow event to be triggered on lower sprites.
    this.iPointerListeners.push(...iPointerListeners);
    // this.engine.Camera.multiply(iPointerListener.Transform);
  }

  public unregisterPointerListener(...iPointerListeners: PointerListener[]) {
    for (const iPointerListener of iPointerListeners) {
      const idx = this.iPointerListeners.indexOf(iPointerListener);
      if (idx === -1) continue;
      this.iPointerListeners.splice(idx, 1);
    }
  }

  public setListenSequenceFirstInFirstTrigger(fift: boolean) {
    this.fift = fift;
  }

  public override setListener(): void {
    throw new Error("Directly modifying pointer listener is forbidden");
  }
}
