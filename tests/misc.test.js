const { hideSecret } = require('../lib/misc');

describe('Miscelleneous utils', () => {
  test('hideSecret("123456789" 3)', () => {
    expect(hideSecret("123456789", 3)).toBe("123******");
  });
});
