import { Size, SizeOpts } from './Size';

describe('Size', () => {
  describe('max', () => {
    it('returns max if no parameters are passed', () => {
      const size = new Size({});
      expect(size.parameters).toBe('max');
    });

    it('returns the correct parameters for max', () => {
      const sizeOpts: SizeOpts = {
        max: true,
      };
      const size = new Size(sizeOpts);
      expect(size.parameters).toBe('max');
    });

    it('returns the correct parameters for upscaled max', () => {
      const sizeOpts: SizeOpts = {
        max: true,
        upscale: true,
      };
      const size = new Size(sizeOpts);
      expect(size.parameters).toBe('^max');
    });
  });

  describe('height and width', () => {
    it.each([
      // WIDTH
      ['width', 100, undefined, false, false, '100,'],
      ['width upscaled', 100, undefined, true, false, '^100,'],
      ['width ratio preserved', 100, undefined, false, true, '100,'],
      [
        'width upscaled and ratio preserved',
        100,
        undefined,
        true,
        true,
        '^100,',
      ],
      // HEIGHT
      ['height', undefined, 100, false, false, ',100'],
      ['height upscaled', undefined, 100, true, false, '^,100'],
      ['height ratio preserved', undefined, 100, false, true, ',100'],
      [
        'height upscaled and ratio preserved',
        undefined,
        100,
        true,
        true,
        '^,100',
      ],
      // WIDTH AND HEIGHT
      ['width and height', 100, 100, false, false, '100,100'],
      ['width and height upscaled', 100, 100, true, false, '^100,100'],
      ['width and height ratio preserved', 100, 100, false, true, '!100,100'],
      [
        'width and height upscaled and ratio preserved',
        100,
        100,
        true,
        true,
        '^!100,100',
      ],
    ])(
      `returns parameters for %s`,
      (_, width, height, upscale, preserve, expectation) => {
        const sizeOpts: SizeOpts = {
          width,
          height,
          upscale,
          preserveAspectRatio: preserve,
        };

        const size = new Size(sizeOpts);
        expect(size.parameters).toBe(expectation);
      }
    );
  });

  describe('percentages', () => {
    it('returns paramaters for standard percentages', () => {
      const sizeOpts: SizeOpts = {
        percent: 85,
      };
      const size = new Size(sizeOpts);
      expect(size.parameters).toBe('pct:85');
    });

    it('returns paramaters for upscaled percentages', () => {
      const sizeOpts: SizeOpts = {
        percent: 200,
        upscale: true,
      };
      const size = new Size(sizeOpts);
      expect(size.parameters).toBe('^pct:200');
    });

    it('automatically upscales if percentage is > 100', () => {
      const sizeOpts: SizeOpts = {
        percent: 200,
      };
      const size = new Size(sizeOpts);
      expect(size.parameters).toBe('^pct:200');
    });
  });
});
