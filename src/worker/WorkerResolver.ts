export default class WorkerResolver {
  private useWorker = true;

  constructor(useWorker: boolean = true) {
    if (
      useWorker &&
      (!window.Worker ||
        !HTMLCanvasElement.prototype.transferControlToOffscreen)
    ) {
      console.warn(
        "The browser lack support for Worker or Offscreen Canvas API\nFallback to main thread"
      );
      this.useWorker = false;
    } else this.useWorker = useWorker;
  }

  public start(canvasIdentifier: HTMLCanvasElement | string | null) {
    let canvas: HTMLCanvasElement | null;
    if (typeof canvasIdentifier === "string") {
      canvas = document.querySelector(
        canvasIdentifier
      ) as HTMLCanvasElement | null;
    } else {
      canvas = canvasIdentifier;
    }

    if (canvas === null) {
      throw new Error("Unable to identify canvas.");
    }
    ///////////////////////////////////////////////////////////////////
    if (this.useWorker) {
      const worker = new Worker("./artistic_engine_worker.js");
      const workerCanvas = canvas.transferControlToOffscreen();
      worker.postMessage({ canvas: workerCanvas }, [workerCanvas]);
    } else {
      const fallbackEntryPoint = (window as any)
        .__artistic_engine_entry_point__;
      if (!fallbackEntryPoint) {
        throw new Error(
          "Unable to start engine in.\nWorkerResolver failed to reach user defined entry point"
        );
      }
      fallbackEntryPoint(canvas);
    }
  }
}
