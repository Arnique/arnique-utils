const { isArray, isObject, isEmpty } = require('../lib/types');

describe('Type checkers', () => {
  // isArray()
  test('isArray() to be false', () => {
    expect(isArray()).toBe(false);
  });

  test('isArray({}) to be false', () => {
    expect(isArray({})).toBe(false);
  });

  test('isArray([]) to be true', () => {
    expect(isArray([])).toBe(true);
  });

  // isObject()
  test('isObject() to be false', () => {
    expect(isObject()).toBe(false);
  });

  test('isObject([]) to be false', () => {
    expect(isObject([])).toBe(false);
  });

  test('isObject({}) to be true', () => {
    expect(isObject({})).toBe(true);
  });

  // isEmpty()
  test('isEmpty({a:1}) to be false', () => {
    expect(isEmpty({a:1})).toBe(false);
  });

  test('isEmpty([1]) to be false', () => {
    expect(isEmpty([1])).toBe(false);
  });

  test('isEmpty("abc") to be false', () => {
    expect(isEmpty('abc')).toBe(false);
  });

  test('isEmpty({}) to be true', () => {
    expect(isEmpty({})).toBe(true);
  });

  test('isEmpty([]) to be true', () => {
    expect(isEmpty([])).toBe(true);
  });

  test('isEmpty(" ") to be true', () => {
    expect(isEmpty(" ")).toBe(true);
  });
});