export default (context: CanvasRenderingContext2D) => {
  if ((<any>context).reset != null) {
    return true;
  }

  // CanvasRenderingContext2D#reset is a experimental method. which may not be included in some browsers including firefox.
  // This block will create reset method mocking the behavior described in Chromium source code.
  // In order to keep track of default state stack in context, relevant methods are modifeied/added as a side effect.
  context.save();
  let stateCount = 0;

  const tempSave = context.save;
  const tempRestore = context.restore;

  context.save = function () {
    tempSave.call(this);
    stateCount++;
  };

  context.restore = function () {
    if (stateCount > 0) {
      tempRestore.call(this);
      stateCount--;
    }
  };

  const restoreRoot = function (_context: CanvasRenderingContext2D) {
    for (let count = stateCount; count > -1; count--) {
      tempRestore.call(_context);
    }
    stateCount = -1;
  };

  (<any>context).reset = function () {
    restoreRoot(context);
    this.moveTo(0, 0);
    this.beginPath();
    this.closePath();
    this.resetTransform();
    this.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.save();
  };
  return false;
};
