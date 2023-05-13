export default class AssetLoader {
  private audioContext: AudioContext | undefined;

  private fonts: FontFace[] = [];

  private images = new Map<string, string | Blob>();

  private audios = new Map<string, string | AudioBuffer>();

  public get AudioContext() {
    return this.audioContext;
  }

  public set AudioContext(audioContext: AudioContext | undefined) {
    this.audioContext = audioContext;
  }

  public addFont(family: string, source: string | BinaryData) {
    this.fonts.push(new FontFace(family, source));
    return this;
  }

  public addImages(name: string, source: string | Blob) {
    this.images.set(name, source);
    return this;
  }

  public addAudios(name: string, source: string | AudioBuffer) {
    this.audios.set(name, source);
    return this;
  }

  public onLoad: (
    images: Map<string, string | Blob>,
    audios: Map<string, string | AudioBuffer>
  ) => void = () => undefined;

  public async load() {
    const loader: Promise<any>[] = [];

    const fontLoaders = this.fonts.map((fontFace) =>
      fontFace
        .load()
        .then(() => document.fonts.add(fontFace))
        .catch((e) => {
          throw new Error(
            "Failed to load font resource: " +
              fontFace.family +
              "\nReason: " +
              e
          );
        })
    );
    loader.push(...fontLoaders);

    this.images.forEach((image, name) => {
      if (image instanceof ImageBitmap) {
        return;
      } else if (typeof image === "string") {
        loader.push(
          fetch(image)
            .then(async (res) => {
              const blob = await res.blob();
              this.images.set(name, blob);
            })
            .catch((e) => {
              throw new Error(
                "Failed to load image resource: " + name + "\nReason: " + e
              );
            })
        );
      }
    });

    if (this.audios.size > 0) {
      if (!(this.audioContext instanceof AudioContext)) {
        this.audioContext = new AudioContext();
      }

      this.audios.forEach((audio, name) => {
        if (audio instanceof ArrayBuffer) {
          return;
        } else if (typeof audio === "string") {
          loader.push(
            fetch(audio)
              .then(async (res) => {
                const arrayBuffer = await res.arrayBuffer();
                const audioBuffer = await this.audioContext!.decodeAudioData(
                  arrayBuffer
                );
                this.audios.set(name, audioBuffer);
              })
              .catch((e) => {
                throw new Error(
                  "Failed to load audio resource: " + name + "\nReason: " + e
                );
              })
          );
        }
      });
    }

    return Promise.all(loader).then(() =>
      this.onLoad(this.images, this.audios)
    );
  }

  public getImage(name: string) {
    const blob = this.images.get(name);
    if (blob instanceof Blob) return blob;
    throw new Error(
      "specified image is not loaded. " +
        "Please check whether the name is correct or the load method has been called."
    );
  }

  public getAudio(name: string) {
    const audioBuffer = this.audios.get(name);
    if (audioBuffer instanceof AudioBuffer) {
      return audioBuffer;
    }
    throw new Error(
      "specified audio is not loaded. " +
        "Please check whether the name is correct or the load method has been called."
    );
  }
}
