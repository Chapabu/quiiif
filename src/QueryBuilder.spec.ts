import { QueryBuilder, QueryBuilderOpts } from './QueryBuilder';

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

  it('adds in a prefix if it exists', () => {
    const opts: QueryBuilderOpts = {
      baseUrl: 'https://example.com',
      imageId: 'my-image.ptif',
      prefix: 'some-prefix',
    };

    const queryBuilder = new QueryBuilder(opts);

    expect(queryBuilder.infoUrl).toBe(
      'https://example.com/some-prefix/my-image.ptif/info.json'
    );
  });
});
