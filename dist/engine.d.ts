import CanvasConfig from "./canvas_config";
import { IDrawable } from "./sprite";
import { Vector2D } from "./vector";
import { Modifier } from "./modifier/modifiers";
import { Transform } from "./transform";
interface ExtendedCanvasRenderingContext2D extends CanvasRenderingContext2D {
    reset(): void;
}
export default class Engine {
    private canvas;
    private context;
    private previousTimestamp;
    private animationId;
    private scene;
    private subReset;
    private camera;
    private modifiers;
    /**
     * Constructor will bind Engine object to a given canvas and check for incompatible canvas features and cover.
     * @param canvasIdentifier one of HTMLCnavasElement or css selector string that indicates canvas element.
     */
    constructor(canvasIdentifier: HTMLCanvasElement | string | null);
    get Canvas(): HTMLCanvasElement;
    get Context(): ExtendedCanvasRenderingContext2D;
    get Scene(): IDrawable;
    get Camera(): Transform;
    set Scene(scene: IDrawable);
    set Camera(camera: Transform);
    /**
     * Register a callback that will be called on each frame.
     * @param func User defined callback that will be executed after each frame is reset completely
     */
    setSubResetFunction(func: (context: CanvasRenderingContext2D) => void): void;
    /**
     * Set canvas width and height to given dimension. Canvas will try to match window size when no arguments are passed.
     * @param config Canvas size dimension.
     */
    resizeCanvas(config?: CanvasConfig | Vector2D): void;
    /**
     * Makes bound canvas begin refreshing with given context. This will also start modifiers to update.
     */
    start(): void;
    /**
     * Makes bound canvas to stop refreshing. This will also stop modifiers to update.
     */
    stop(): void;
    /**
     * register and start given modifier from this engine.
     * @param modifier Modifier to hult execution.
     */
    registerModifier(modifier: Modifier): void;
    /**
     * Stops and removes given modifier from update pool in this engine.
     * @param modifier Modifier to hult execution.
     */
    unregisterModifier(modifier: Modifier): void;
    private render;
}
export {};
