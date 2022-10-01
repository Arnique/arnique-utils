const { SecureAttempt } = require('../lib/secure_attempt');
const fs = require('fs');

describe('Auth utils', () => {
  test('SecureAttempt', () => {
    let s = new SecureAttempt();

    expect(s.count(true).success).toBe(true);

    s = new SecureAttempt();
    s.count(false);
    s.count(false);
    s.count(false);
    expect(s.count(true).success).toBe(false);
  });
});
