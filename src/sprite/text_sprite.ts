import Sprite from "./sprite";

interface TextProperties {
  direction: CanvasDirection;
  fill: string | CanvasGradient | CanvasPattern;
  font: string; // TODO: replace with engine defined font object
  fontKerning: CanvasFontKerning;
  textAlign: CanvasTextAlign;
  textBaseLine: CanvasTextBaseline;
  lineSpacing: number;
}

export default class TextSprite extends Sprite {
  protected text: string | (() => string) = "";

  protected property: TextProperties = {
    direction: "inherit",
    fill: "#000",
    font: "",
    fontKerning: "auto",
    textAlign: "start",
    textBaseLine: "top",
    lineSpacing: 0,
  };

  public get Text(): string {
    if (typeof this.text === "string") return this.text;
    return this.text();
  }

  public get Property() {
    return this.property;
  }

  public set Text(text: string | (() => string)) {
    this.text = text;
  }

  public set Property(textProperty: TextProperties) {
    this.property = textProperty;
  }

  public onDraw(context: CanvasRenderingContext2D): void {
    context.direction = this.property.direction;
    context.fillStyle = this.property.fill;
    context.font = this.property.font;
    context.fontKerning = this.property.fontKerning;
    context.textAlign = this.property.textAlign;
    context.textBaseline = this.property.textBaseLine;
    const lines = this.Text.split("\n");
    for (let i = 0; i < lines.length; i++) {
      context.fillText(lines[i], 0, i * this.property.lineSpacing);
    }
  }
}
