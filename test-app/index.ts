import { Engine } from "../src";
import GridScene from "./grid-scene";
import TestRectangle from "./test-rectangle";

document.body.style.margin = "0";

const engine = new Engine("#main");
engine.resizeCanvas();

engine.Scene = new GridScene(engine.Canvas.width, engine.Canvas.height, 100);

engine.Scene.attachChildren([
  new TestRectangle("red", true),
  new TestRectangle("blue", false),
]);

addEventListener("resize", () => {
  engine.resizeCanvas();
  engine.Scene.Width = engine.Canvas.width;
  engine.Scene.Height = engine.Canvas.height;
});

engine.start();
