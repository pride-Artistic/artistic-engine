import { Engine, Transform } from "../src";
import FontBuilder from "../src/font_builder";
import { EaseFunctions, Modifier } from "../src/modifiers";
import { TextSprite } from "../src/sprite";
import { Vector2D } from "../src/vector";
import GridScene from "./grid-scene";
import TestRectangle from "./test-rectangle";

document.body.style.margin = "0";

const engine = new Engine("#main");
engine.resizeCanvas();

const scene = new GridScene(engine.Canvas.width, engine.Canvas.height, 100);
engine.Scene = scene;

// START FONT LOADING EXAMPLE
const f = new FontFace(
  "Poppin",
  "url(https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLGT9Z1xlFQ.woff2)"
);

const text = new TextSprite();
f.load()
  .then(() => {
    const fontBuilder = new FontBuilder("Poppin");
    fontBuilder.setSize("80px").setWeight("500");
    console.log(fontBuilder.toString());

    document.fonts.add(f);
    text.Property.fill = "white";
    text.Property.font = fontBuilder.toString();
    text.Text = "artistic engine 🥳";
    text.Position = new Vector2D(700, 400);

    scene.attachChildren(text);
  })
  .catch(console.log);

const engineText = "artistic engine 🥳";
let lastTick = Date.now();
setInterval(() => {
  engine.registerModifier(
    new Modifier(
      0,
      engineText.length,
      2000,
      (v) => {
        v = Math.ceil(v);
        if (v === 17) v = 16;
        if (Date.now() - lastTick < 20 && v != engineText.length) return;
        lastTick = Date.now();
        text.Text = engineText.slice(0, v);
      },
      EaseFunctions.EaseOutCirc
    )
  );
}, 4000);

// END FONT LOADING EXAMPLE

scene.attachChildren([
  new TestRectangle("red", true, engine),
  new TestRectangle("blue", false, engine),
]);

addEventListener("resize", () => {
  engine.resizeCanvas();
  scene.Width = engine.Canvas.width;
  scene.Height = engine.Canvas.height;
});

const usingTransform = true;

const t = new Transform();
t.rotate(180 / -12);
t.translate(200, 100);

// scene.Transform = t;
// TODO: check matrix sequence

engine.setSubResetFunction((context: CanvasRenderingContext2D) => {
  if (usingTransform) context.setTransform(t.toDOM());
  else {
    context.translate(200, 100);
    context.rotate(Math.PI / 12);
  }
});

engine.start();
