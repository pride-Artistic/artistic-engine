import { Sprite } from "../src";

export default class GridScene extends Sprite {
  constructor(width: number, height: number, gridSize: number) {
    super({
      w: width,
      h: height,
      drawer: function (self, context) {
        context.fillStyle = "black";
        context.fillRect(0, 0, self.Width, self.Height);
        context.fillStyle = "white";
        context.strokeStyle = "white";
        for (let i = 0; i < self.Width; i += gridSize) {
          context.fillText(String(i), i + 1, 10);
          context.moveTo(i, 0);
          context.lineTo(i, self.Height);
        }
        for (let i = gridSize; i < self.Height; i += gridSize) {
          context.fillText(String(i), 1, i - 2);
          context.moveTo(0, i);
          context.lineTo(self.Width, i);
        }
        context.stroke();
      },
    });
  }
}
