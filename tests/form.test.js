const { ReqHelper } = require('../lib/form');

function asyncTest(pass = true) {
  return pass ? Promise.resolve('OK') : Promise.reject('ERR')
}

describe('Form utils', () => {
  test('ReqHelper', async () => {
    const h = new ReqHelper();

    await h.send(asyncTest(true));
    expect(h.busy).toEqual(false);
    expect(h.data).toEqual('OK');
    expect(h.state).toEqual('PASSED');

    await h.send(asyncTest(false));
    expect(h.busy).toEqual(false);
    expect(h.error.message).toEqual('ERR');
    expect(h.state).toEqual('FAILED');
  })
});