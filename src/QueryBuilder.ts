export interface QueryBuilderOpts {
  baseUrl: string;
  imageId: string;
  prefix?: string;
}

export type ImageFormat =
  | 'jpg'
  | 'tif'
  | 'png'
  | 'gif'
  | 'jp2'
  | 'pdf'
  | 'webp';

export type ImageQuality = 'color' | 'gray' | 'bitonal' | 'default';

export class QueryBuilder {
  readonly baseUrl: string;

  readonly imageId: string;

  public format: ImageFormat = 'jpg';

  public quality: ImageQuality = 'default';

  constructor({ baseUrl, imageId, ...opts }: QueryBuilderOpts) {
    this.baseUrl = baseUrl.replace(/\/+$/, '');

    if (opts.prefix) {
      this.baseUrl += `/${opts.prefix}`;
    }

    this.imageId = imageId;
  }

  public get infoUrl(): string {
    return `${this.baseUrl}/${this.imageId}/info.json`;
  }
}
