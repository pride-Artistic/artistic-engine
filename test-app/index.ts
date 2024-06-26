import { Engine, Transform } from "../src";
import { PointerEventGroup } from "../src/event";
import FontBuilder from "../src/font_builder";
import { EaseFunctions, Modifier } from "../src/modifiers";
import { TextSprite } from "../src/sprite";
import { Vector2D } from "../src/vector";
import { controller } from "./controller";
import GridScene from "./grid-scene";
import TestRectangle from "./test-rectangle";

document.body.style.margin = "0";

const engine = new Engine("#main");
engine.resizeCanvas();

const scene = new GridScene(engine.Canvas.width, engine.Canvas.height, 100);
engine.Scene = scene;

// START FONT LOADING EXAMPLE

const font = "Poppin";
engine.AssetLoader.addFont(
  font,
  "url(https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLGT9Z1xlFQ.woff2)"
);

const engineText = "artistic engine 🥳";
const text = new TextSprite();

engine.AssetLoader.onLoad = async () => {
  const fontBuilder = new FontBuilder(font);
  fontBuilder.setSize("80px").setWeight("500");
  console.log(fontBuilder.toString());

  text.Property.fill = "white";
  text.Property.font = fontBuilder.toString();
  text.Text = engineText;
  text.Position = new Vector2D(500, -300);

  scene.attachChildren(text);

  let lastTick = performance.now();
  setInterval(() => {
    engine.registerModifier(
      new Modifier(
        0,
        engineText.length,
        2000,
        (v) => {
          v = Math.ceil(v);
          if (v === 17) v = 16;
          if (performance.now() - lastTick < 20 && v != engineText.length) {
            return;
          }

          lastTick = performance.now();
          text.Text = engineText.slice(0, v);
        },
        EaseFunctions.EaseOutCirc
      )
    );
  }, 4000);

  // const bitmapB = new Bitmap(engine.AssetLoader.getImage("test1"));
  // const bitmap = await bitmapB.getImageBitmap();
  // const txSp = new TextureSprite({
  //   X: 400,
  //   Y: 0,
  //   texture: bitmap,
  // });
  // scene.attachChildren(txSp);
};

engine.AssetLoader.load();

// END FONT LOADING EXAMPLE
const recRED = new TestRectangle("red", true, engine);
const recBLUE = new TestRectangle("blue", false, engine);
scene.attachChildren([recRED, recBLUE]);

addEventListener("resize", () => {
  engine.resizeCanvas();
  scene.Width = engine.Canvas.width;
  scene.Height = engine.Canvas.height;
});

const t = new Transform();
t.translate(50, 50);
t.rotate(Math.PI / 6);
t.translate(200, 100);
t.rotate(Math.PI / -12);

// scene.Transform = t;
// TODO: check matrix sequence
engine.Camera = t;

controller(engine.Canvas);

const pointerGroup = new PointerEventGroup(engine);
pointerGroup.registerPointerListener(recRED);
pointerGroup.registerEvent();

recRED.X = 700;
recRED.Y = 400;

engine.start();
