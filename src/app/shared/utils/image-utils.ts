export type ImageBackground = 'light' | 'dark';

export interface ImageBackgroundInfo {
  /** Average color of the image border pixels, as a CSS `rgb()` string. */
  color: string;
  brightness: ImageBackground;
  luminance: number;
}

export class ImageUtils {
  private static readonly SAMPLE_SIZE = 32;
  private static readonly BORDER_RATIO = 0.15;
  private static readonly RANDOM_SAMPLES = 100;
  /** Colors are bucketed by this step before counting, so near-identical shades group together. */
  private static readonly COLOR_BUCKET = 16;
  /** Max channel distance from 0 / 255 for a color to be treated as pure black / white. */
  private static readonly SNAP_TOLERANCE = 28;
  private static readonly FALLBACK: ImageBackgroundInfo = {
    color: 'rgb(255, 255, 255)',
    brightness: 'light',
    luminance: 1,
  };

  /** Analyzes the image border pixels and returns the background color and whether it is light or dark. */
  static async getBackgroundInfo(
    image: HTMLImageElement | string,
    luminanceThreshold = 0.5,
  ): Promise<ImageBackgroundInfo> {
    const { data, size } = await ImageUtils.getPixels(image);
    const border = Math.max(1, Math.round(size * ImageUtils.BORDER_RATIO));

    const average = ImageUtils.averageColor(
      data,
      size,
      (x, y) => x < border || y < border || x >= size - border || y >= size - border,
    );

    // Fully transparent borders are rendered over the page background.
    if (!average) return ImageUtils.FALLBACK;

    const { r, g, b } = average;
    const luminance = ImageUtils.relativeLuminance(r, g, b);

    return {
      color: `rgb(${r}, ${g}, ${b})`,
      brightness: luminance >= luminanceThreshold ? 'light' : 'dark',
      luminance,
    };
  }

  static async getBackgroundBrightness(
    image: HTMLImageElement | string,
    luminanceThreshold = 0.5,
  ): Promise<ImageBackground> {
    const { brightness } = await ImageUtils.getBackgroundInfo(image, luminanceThreshold);
    return brightness;
  }

  /** Most frequent color among 100 random pixels of the image, as a CSS `rgb()` string. */
  static async getBackgroundColor(image: HTMLImageElement | string): Promise<string> {
    const { data, size } = await ImageUtils.getPixels(image);
    const pixelCount = size * size;
    const bucket = ImageUtils.COLOR_BUCKET;
    const buckets = new Map<number, { r: number; g: number; b: number; count: number }>();

    for (let sample = 0; sample < ImageUtils.RANDOM_SAMPLES; sample++) {
      const i = Math.floor(Math.random() * pixelCount) * 4;
      if (data[i + 3] / 255 < 0.1) continue;

      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const key =
        (Math.floor(r / bucket) << 16) | (Math.floor(g / bucket) << 8) | Math.floor(b / bucket);

      const entry = buckets.get(key);
      if (entry) {
        entry.r += r;
        entry.g += g;
        entry.b += b;
        entry.count++;
      } else {
        buckets.set(key, { r, g, b, count: 1 });
      }
    }

    let dominant: { r: number; g: number; b: number; count: number } | null = null;
    for (const entry of buckets.values()) {
      if (!dominant || entry.count > dominant.count) {
        dominant = entry;
      }
    }

    if (!dominant) return ImageUtils.FALLBACK.color;

    const { r, g, b } = ImageUtils.snapToBlackOrWhite({
      r: Math.round(dominant.r / dominant.count),
      g: Math.round(dominant.g / dominant.count),
      b: Math.round(dominant.b / dominant.count),
    });

    return `rgb(${r}, ${g}, ${b})`;
  }

  static async isDarkBackground(
    image: HTMLImageElement | string,
    luminanceThreshold = 0.5,
  ): Promise<boolean> {
    return (await ImageUtils.getBackgroundBrightness(image, luminanceThreshold)) === 'dark';
  }

  private static async getPixels(
    image: HTMLImageElement | string,
  ): Promise<{ data: Uint8ClampedArray; size: number }> {
    const element = typeof image === 'string' ? await ImageUtils.loadImage(image) : image;

    if (!element.complete || element.naturalWidth === 0) {
      await ImageUtils.waitForLoad(element);
    }

    const size = ImageUtils.SAMPLE_SIZE;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;

    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) {
      throw new Error('Canvas 2D context is not available.');
    }

    context.drawImage(element, 0, 0, size, size);

    try {
      return { data: context.getImageData(0, 0, size, size).data, size };
    } catch {
      throw new Error('Image is cross-origin tainted; serve it with CORS headers.');
    }
  }

  private static averageColor(
    data: Uint8ClampedArray,
    size: number,
    isSampled: (x: number, y: number) => boolean,
  ): { r: number; g: number; b: number } | null {
    let red = 0;
    let green = 0;
    let blue = 0;
    let samples = 0;

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (!isSampled(x, y)) continue;

        const i = (y * size + x) * 4;
        if (data[i + 3] / 255 < 0.1) continue;

        red += data[i];
        green += data[i + 1];
        blue += data[i + 2];
        samples++;
      }
    }

    if (samples === 0) return null;

    return {
      r: Math.round(red / samples),
      g: Math.round(green / samples),
      b: Math.round(blue / samples),
    };
  }

  private static snapToBlackOrWhite(color: { r: number; g: number; b: number }): {
    r: number;
    g: number;
    b: number;
  } {
    const { r, g, b } = color;
    const tolerance = ImageUtils.SNAP_TOLERANCE;

    if (r <= tolerance && g <= tolerance && b <= tolerance) {
      return { r: 0, g: 0, b: 0 };
    }

    if (r >= 255 - tolerance && g >= 255 - tolerance && b >= 255 - tolerance) {
      return { r: 255, g: 255, b: 255 };
    }

    return color;
  }

  private static relativeLuminance(r: number, g: number, b: number): number {
    const toLinear = (channel: number): number => {
      const c = channel / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };

    return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
  }

  private static loadImage(src: string): Promise<HTMLImageElement> {
    const element = new Image();
    element.crossOrigin = 'anonymous';
    element.src = src;
    return ImageUtils.waitForLoad(element);
  }

  private static waitForLoad(element: HTMLImageElement): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      if (element.complete && element.naturalWidth > 0) {
        resolve(element);
        return;
      }

      element.addEventListener('load', () => resolve(element), { once: true });
      element.addEventListener(
        'error',
        () => reject(new Error(`Failed to load image: ${element.src}`)),
        {
          once: true,
        },
      );
    });
  }
}
