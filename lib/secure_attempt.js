const parseDur = require('parse-duration');
const { msToDuration } = require('./date');

class AttemptResponse {
  constructor({
    success = false,
    error = '',
  } = {}) {
    this.error = error;
    this.success = success;
  }
}

class SecureAttempt {
  constructor({
    error = null,
    lockDur = '1h',
    maxTries = 3,
    message = null,
    tries = 0,
    triesLock = null,
    failMessage = 'Failed! {{n}} attempt(s) left.',
    lockedMessage = 'Tries locked for {{dur}}. Please wait'
  } = {}) {
    this.lockDur = lockDur;
    this.maxTries = maxTries;
    this.tries = tries;
    this.triesLock = triesLock;
    this.message = message;
    this.error = error;
    this.failMessage = failMessage;
    this.lockedMessage = lockedMessage;
  }

  get lockDurMs() {
    return parseDur(this.lockDur);
  }  

  reset() {
    this.tries = 0;
    this.resets = 0;
    this.triesLock = null;
  }

  count(passed = false) {
    const now = Date.now();

    // Reset if expired
    if (this.triesLock && now > this.triesLock) {
      this.reset();
    }

    // Return if locked
    if (this.triesLock && now < this.triesLock) {
      const d = this.triesLock - now;
      const dur = msToDuration(d);

      return new AttemptResponse({
        error: this.lockedMessage.replace('{{dur}}', dur)
      })
    }

    // Count
    this.tries++;

    // Wrong code
    if (!passed) {
      const n = this.maxTries - this.tries;

      if (n === 0) {
        this.triesLock = now + this.lockDurMs;
        const d = this.triesLock - now;
        const dur = msToDuration(d);

        return new AttemptResponse({
          error: this.lockedMessage.replace('{{dur}}', dur)
        })
      }

      return new AttemptResponse({
        error: this.failMessage.replace('{{n}}', n)
      });
    }

    // Passed
    this.reset();
    return new AttemptResponse({ success: true });
  }
}

module.exports = { 
  SecureAttempt
}
