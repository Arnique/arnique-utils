const { JsonState } = require('../lib/state');
const fs = require('fs');

function cleanup() {
  try {
    const f = 'state.json';
    if (fs.existsSync(f)) fs.unlinkSync(f);
  } catch (e) {
    console.log('[WARN]', e.message || e);
  }
}

beforeAll(() => {
  cleanup();
  return;
});

afterAll(() => {
  cleanup();
  return;
});

describe('State utils', () => {
  test('JsonState', () => {
    const s = new JsonState({
      data: { users: [] },
      userOpts: { users: { type: 'Array', title: 'Usernames' }}
    });

    s.init();
    s.data.users = ['a','b','c'];
    s.save();

    expect(s.opts.users.value).toBe('a,b,c');
  });
});
