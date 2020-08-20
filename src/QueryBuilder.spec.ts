import QueryBuilder, { QueryBuilderOpts } from './QueryBuilder';

describe('QueryBuilder', () => {
  it('returns an info url', () => {
    const opts: QueryBuilderOpts = {
      baseUrl: 'https://example.com',
      imageId: 'my-image.ptif',
    };

    const queryBuilder = new QueryBuilder(opts);

    expect(queryBuilder.infoUrl).toBe(
      'https://example.com/my-image.ptif/info.json'
    );
  });

  it('ignores trailing slashes on URLs', () => {
    const opts: QueryBuilderOpts = {
      baseUrl: 'https://example.com/',
      imageId: 'my-image.ptif',
    };

    const queryBuilder = new QueryBuilder(opts);

    expect(queryBuilder.infoUrl).toBe(
      'https://example.com/my-image.ptif/info.json'
    );
  });

  it('ignores multiple trailing slashes on URLs', () => {
    const opts: QueryBuilderOpts = {
      baseUrl: 'https://example.com/////',
      imageId: 'my-image.ptif',
    };

    const queryBuilder = new QueryBuilder(opts);

    expect(queryBuilder.infoUrl).toBe(
      'https://example.com/my-image.ptif/info.json'
    );
  });

  it('adds in the image path if it exists', () => {
    const opts: QueryBuilderOpts = {
      baseUrl: 'https://example.com',
      imageId: 'my-image.ptif',
      path: 'some-path',
    };

    const queryBuilder = new QueryBuilder(opts);

    expect(queryBuilder.infoUrl).toBe(
      'https://example.com/some-path/my-image.ptif/info.json'
    );
  });
});
