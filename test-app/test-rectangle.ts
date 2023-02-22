import { Sprite } from "../src";

export default class TestRectangle extends Sprite {
  constructor(color: string, isXMoving: boolean) {
    super({
      w: 100,
      h: 100,
      drawer: function (self, context, delay) {
        context.fillStyle = color;
        context.fillRect(
          self.AbsoluteX,
          self.AbsoluteY,
          self.Width,
          self.Height
        );
        const moveWidth = context.canvas.width + self.Width;
        const moveHeight = context.canvas.height + self.Height;
        if (isXMoving) {
          const rawX = self.X + delay + self.Width;
          if (rawX > moveWidth)
            self.Y = Math.random() * (context.canvas.height - self.Height);
          self.X = (rawX % moveWidth) - self.Width;
        } else {
          const rawY = self.Y + delay + self.Height;
          if (rawY > moveHeight)
            self.X = Math.random() * (context.canvas.width - self.Width);
          self.Y = (rawY % moveHeight) - self.Height;
        }
      },
    });
  }
}
