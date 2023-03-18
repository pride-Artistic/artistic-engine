import CanvasConfig from "./canvas_config";
import { IDrawable } from "./sprite";
import { Vector2D } from "./vector";
interface ExtendedCanvasRenderingContext2D extends CanvasRenderingContext2D {
    reset(): void;
}
export default class Engine {
    private canvas;
    private context;
    private subReset;
    private previousTimestamp;
    private animationId;
    private scene;
    constructor(canvasIdentifier: HTMLCanvasElement | string | null);
    get Canvas(): HTMLCanvasElement;
    get Context(): ExtendedCanvasRenderingContext2D;
    get Scene(): IDrawable;
    set Scene(scene: IDrawable);
    setSubResetFunction(func: (context: CanvasRenderingContext2D) => void): void;
    resizeCanvas(config?: CanvasConfig | Vector2D): void;
    start(): void;
    stop(): void;
    private render;
}
export {};
