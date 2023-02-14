import { Engine } from "../src";

class Wow {
  constructor(
    onCanvas: (canvas: HTMLCanvasElement | OffscreenCanvas) => void | never
  ) {
    if (
      typeof WorkerGlobalScope !== "undefined" &&
      self instanceof WorkerGlobalScope
    ) {
      const workerContext: Worker = self as any;
      workerContext.onmessage = (event) => {
        const canvas: OffscreenCanvas | null = event.data.canvas;
        if (canvas) {
          onCanvas(canvas);
        }
      };
    } else {
      (window as any).__artistic_engine_entry_point__ = onCanvas;
    }
  }
}

new Wow((canvas) => {
  new Engine(canvas);
  console.log(
    `this is ${
      typeof WorkerGlobalScope !== "undefined" &&
      self instanceof WorkerGlobalScope
        ? "worker"
        : "main"
    } thread`
  );
});
