import { Engine } from "../src";
import { TextSprite } from "../src/sprite";
import { Vector2D } from "../src/vector";
import GridScene from "./grid-scene";
import TestRectangle from "./test-rectangle";

document.body.style.margin = "0";

const engine = new Engine("#main");
engine.resizeCanvas();

const scene = new GridScene(engine.Canvas.width, engine.Canvas.height, 100);
engine.Scene = scene;

const f = new FontFace(
  "Poppin",
  "url(https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLGT9Z1xlFQ.woff2)"
);

f.load()
  .then(() => {
    document.fonts.add(f);
    const text = new TextSprite();
    text.Property.fill = "white";
    text.Property.font = "500 20px Poppin";
    text.Text = "artistic baby 🥳";
    text.Position = new Vector2D(700, 400);

    scene.attachChildren(text);
  })
  .catch(console.log);

scene.attachChildren([
  new TestRectangle("red", true, engine),
  new TestRectangle("blue", false, engine),
]);

addEventListener("resize", () => {
  engine.resizeCanvas();
  scene.Width = engine.Canvas.width;
  scene.Height = engine.Canvas.height;
});

engine.start();
