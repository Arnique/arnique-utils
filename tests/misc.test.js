const { hideSecret, cascadeArr, cascadeObj } = require('../lib/misc');

describe('Miscelleneous utils', () => {
  test('hideSecret()', () => {
    expect(hideSecret("123456789", 3)).toBe("123******");
  });

  test('cascadeArr', () => {
    const a = [5,null,6,0,null,7];
    expect(cascadeArr(a)).toEqual([5,5,6,0,0,7]);
  });

  test('cascadeObj', () => {
    const x = { a:5, b: null, c: 6, d: 0, e: null, f: 7 };
    expect(cascadeObj(x)).toEqual({a:5, b:5, c:6, d:0, e:0, f:7});
  });
});
