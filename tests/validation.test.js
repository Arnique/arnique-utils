const { illegalKeys, hasIllegalKeys, validateObj } = require('../lib/validation');

describe('Validation', () => {
  const schema = {
    a: {
      type: String
    },
    b: {
      type: String
    }
  }

  test('illegalKeys() to be ["c", "d"]', () => {
    expect(illegalKeys(schema, { c:1, d:1 })).toEqual(['c', 'd']);
  });

  test('hasIllegalKeys() to be true', () => {
    expect(hasIllegalKeys(schema, { c:1, d:1 })).toBe(true);
  });

  test('validate() to be null', () => {
    expect(validateObj(schema, { a: '', b: ''})).toBe(null);
  });

  test('validate() to be not null', () => {
    expect(validateObj(schema, { a: 1, b: 2})).not.toEqual(null);
  });
});