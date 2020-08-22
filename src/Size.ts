export interface SizeOpts {
  max?: boolean;
  upscale?: boolean;
  percent?: number;
  width?: number;
  height?: number;
  preserveAspectRatio?: boolean;
}

export class Size {
  readonly max?: boolean;

  readonly upscale?: boolean;

  readonly width?: number;

  readonly height?: number;

  readonly percent?: number;

  readonly preserveAspectRatio?: boolean;

  constructor(opts: SizeOpts) {
    this.max = opts.max;
    this.upscale = opts.upscale;
    this.percent = opts.percent;
    this.width = opts.width;
    this.height = opts.height;
    this.preserveAspectRatio = opts.preserveAspectRatio;
  }

  public get parameters(): string {
    let prefix = '';
    let parameters = 'max';

    if (this.upscale) {
      prefix = '^';
    }

    // Heights and widths.
    if (this.width || this.height) {
      parameters = `${this.width ?? ''},${this.height ?? ''}`;
    }

    if (this.width && this.height && this.preserveAspectRatio) {
      prefix += '!';
    }

    return `${prefix}${parameters}`;
  }
}
