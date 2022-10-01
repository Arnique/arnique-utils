const { SecureCode } = require('../lib/secure_code');
const fs = require('fs');

describe('Auth utils', () => {
  test('SecureCode', () => {
    let s = new SecureCode();
    s.setCode('123');

    expect(s.checkCode('111').error).not.toBeNull();
    expect(s.checkCode('123').success).toBe(true);

    s = new SecureCode();
    s.setCode('123');
    s.setCode('123');
    s.setCode('123');

    expect(s.setCode('123').error).not.toBeNull();

    s = new SecureCode();
    s.setCode('123');
    s.checkCode('111');
    s.checkCode('111');
    s.checkCode('111');
    s.checkCode('111');
    
    expect(s.checkCode('111').error).not.toBeNull();
  });
});
