const fs = require('fs');
const parseDur = require('parse-duration');

const { msToDuration } = require('./date');
const { randNumberString, randGuid, randAlphaNum } = require('./misc')

class SecureResponse {
  constructor({
    created = null,
    expiry = null,
    success = false,
    message = '',
    error = '',
  } = {}) {
    this.message = message;
    this.error = error;
    this.created = created;
    this.expiry = expiry;
    this.success = success;
  }
}

class SecureCode {
  constructor({
    code = null,
    expiry = null,
    lockDur = '1h',
    expiryDur = '1h',
    maxTries = 3,
    maxResets = 3,
    resets = 0,
    resetsLock = null,
    tries = 0,
    triesLock = null,
    message = null,
    error = null,
  } = {}) {
    this.code = code;
    this.expiry = expiry;
    this.lockDur = lockDur;
    this.expiryDur = expiryDur;
    this.maxTries = maxTries;
    this.maxResets = maxResets;
    this.resets = resets;
    this.resetsLock = resetsLock;
    this.tries = tries;
    this.triesLock = triesLock;
    this.created = null;
    this.message = message;
    this.error = error;
  }

  get lockDurMs() {
    return parseDur(this.lockDur);
  }

  get expiryDurMs() {
    return parseDur(this.expiryDur);
  }

  reset() {
    this.code = null;
    this.expiry = null;
    this.tries = 0;
    this.resets = 0;
    this.resetsLock = null;
    this.triesLock = null;
  }

  setRandAlphaNum(len=20, spacerDist = 4) {
    const v = randAlphaNum(len, spacerDist);
    return this.setCode(v);
  }

  setRandDigitCode(len = 6) {
    const v = randNumberString(len)
    return this.setCode(v);
  }

  setRandGuid() {
    const v = randGuid();
    return this.setCode(v);
  }

  setCode(code) {
    const now = Date.now();

    // Reset if expired
    if (this.resetsLock && now > this.resetsLock) {
      this.reset();
    }

    // Return if reset locked
    if (this.resetsLock && now < this.resetsLock) {
      const d = this.resetsLock - now;
      const dur = msToDuration(d);
      this.error =  `Resets locked for ${dur}. Please wait`;

      return new SecureResponse({
        success: false,
        error: this.error
      });
    }

    // Return if tries locked
    if (this.triesLock && now < this.triesLock) {
      const d = this.triesLock - now;
      const dur = msToDuration(d);
      this.error = `Tries locked for ${dur}. Please wait`;

      return new SecureResponse({
        success: false,
        error: this.error
      });
    }

    // Lock if too many
    if (this.resets + 1 >= this.maxResets) {
      this.resetsLock = now + this.lockDurMs;
      this.code = null;
      const dur = msToDuration(this.lockDurMs);
      this.error = `Too many resets. Locked for ${dur}.`

      return new SecureResponse({
        success: false,
        error: this.error
      });
    }

    // Passed
    this.code = code;
    this.created = Date.now();
    this.expiry = this.created + this.expiryDurMs;
    this.resets++;

    const dur = msToDuration(this.expiry - now);
    this.message = `Code expires in ${dur}`;

    return new SecureResponse({
      success: true,
      message: this.message,
      created: this.created,
      expiry: this.expiry
    });
  }

  checkCode(code, checkFunc = null) {
    const now = Date.now();

    // Reset if expired
    if (now > this.expiry || this.triesLock && now > this.triesLock) {
      this.reset();
      this.error = 'Code expired. Please request new code';

      return new SecureResponse({
        success: false,
        error: this.error
      });
    }

    // Return if locked
    if (this.triesLock && now < this.triesLock) {
      const d = this.triesLock - now;
      const dur = msToDuration(d);
      this.error = `Tries locked for ${dur}. Please wait`;

      return new SecureResponse({
        success: false,
        error: this.error
      });
    }

    // Count
    this.tries++;

    // Chek func
    const match = checkFunc ? checkFunc(code) : code === this.code;

    // Wrong code
    if (!match) {
      const n = this.maxTries - this.tries;

      if (n === 0) {
        this.triesLock = now + this.lockDurMs;
        const d = this.triesLock - now;
        const dur = msToDuration(d);
        this.error = `Too many wrong attempt(s). Locked for ${dur}.`;

        return new SecureResponse({
          success: false,
          error: this.error
        });
      }

      this.error = `Wrong code. ${n} attempt(s) left.`;

      return new SecureResponse({
        success: false,
        error: this.error
      });
    }

    // Passed
    this.reset();

    return new SecureResponse({
      success: true
    });
  }
}

module.exports = { SecureCode }
