export interface QueryBuilderOpts {
  baseUrl: string;
  imageId: string;
  path?: string;
}

class QueryBuilder {
  readonly baseUrl: string;

  readonly imageId: string;

  constructor({ baseUrl, imageId, ...opts }: QueryBuilderOpts) {
    this.baseUrl = baseUrl.replace(/\/+$/, '');

    if (opts.path) {
      this.baseUrl += `/${opts.path}`;
    }

    this.imageId = imageId;
  }

  public get infoUrl(): string {
    return `${this.baseUrl}/${this.imageId}/info.json`;
  }
}

export default QueryBuilder;
