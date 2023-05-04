import { Engine } from "../src";
import Ailre from "./ailre";
import GridScene from "./grid-scene";
// import TestRectangle from "./test-rectangle";

document.body.style.margin = "0";

const engine = new Engine("#main");
engine.resizeCanvas();

const scene = new GridScene(engine.Canvas.width, engine.Canvas.height, 100);
engine.Scene = scene;

// scene.attachChildren([
//   new TestRectangle("red", true, engine),
//   new TestRectangle("blue", false, engine),
// ]);

scene.attachChildren(new Ailre());

addEventListener("resize", () => {
  engine.resizeCanvas();
  scene.Width = engine.Canvas.width;
  scene.Height = engine.Canvas.height;
});

engine.start();
