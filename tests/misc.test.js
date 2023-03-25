const { hideSecret, cascadeArr, cascadeObj, awaiter, waitUntil, pick, pluck } = require('../lib/misc');

function asyncTest(pass = true) {
  return pass ? Promise.resolve('OK') : Promise.reject('ERR')
}

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

  test('awaiter', async () => {
    const r1 = await awaiter(asyncTest(true));
    expect(r1.data).toEqual('OK');
    expect(r1.error).toEqual(null);

    const r2 = await awaiter(asyncTest(false));
    expect(r2.error).toEqual('ERR');
    expect(r2.data).toEqual(null);
  })

  test('waitUntil', async () => {
    // Should resolves true within time limit
    let v1 = false;
    setTimeout(()=> v1 = true, 500);

    const r1 = await waitUntil(() => v1 === true, 100, 500);
    expect(r1).toEqual(true);

    // Should fail as it's outside time limit
    let v2 = false;
    setTimeout(()=> v2 = true, 600);

    const r2 = await waitUntil(() => v2 === true, 100, 500);
    expect(r2).toEqual(false);
  })

  test('pick', () => {
    const v = { a: 1, b: 2, c: 3 };
    expect(pick(v, ['a', 'c'])).toEqual({ a: 1, c: 3});
  });

  test('pluck', () => {
    const v = { a: 1, b: 2, c: 3 };
    expect(pluck(v, ['a', 'c'])).toEqual({ b: 2 });
  });
});
