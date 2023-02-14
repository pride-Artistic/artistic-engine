import { Engine, Application } from "../src";

new Application((canvas) => {
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
