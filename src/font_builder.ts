export default class FontBuilder {
  private family: string;

  private style: string = "";

  private variant: string = "";

  private weight: string = "";

  private size: string = "20px";

  private lineHeight: string = "";

  constructor(family: string = "sans-serif") {
    this.family = family;
  }

  public get Family() {
    return this.family;
  }

  public get Style() {
    return this.style;
  }

  public get Variant() {
    return this.variant;
  }

  public get Weight() {
    return this.weight;
  }

  public get Size() {
    return this.size;
  }

  public get LineHeight() {
    return this.lineHeight;
  }

  public setStyle(style: string) {
    this.style = style;
    return this;
  }

  public setVariant(variant: string) {
    this.variant = variant;
    return this;
  }

  public setWeight(weight: string) {
    this.weight = weight;
    return this;
  }

  public setSize(size: string) {
    this.size = size;
    return this;
  }

  public setLineHeight(lineHeight: string) {
    this.lineHeight = lineHeight;
    return this;
  }

  public toString() {
    if (this.size.length < 1 || this.family.length < 1) {
      throw new Error("Failed to generate font style with empty size/family.");
    }
    let fontString = "";
    if (this.style.length > 0) {
      fontString += this.style + " ";
    }
    if (this.variant.length > 0) {
      fontString += this.variant + " ";
    }
    if (this.weight.length > 0) {
      fontString += this.weight + " ";
    }
    fontString += this.size;
    if (this.lineHeight.length > 0) {
      fontString += "/" + this.lineHeight;
    }
    fontString += " " + this.family;
    return fontString;
  }
}
