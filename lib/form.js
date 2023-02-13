const { awaiter } = require('./misc');
const { isString } = require('./types');

class ReqHelper {
  constructor({
    model = null,
    errorMaker = getError
  } = {}) {
    this.reset();
    this.model = model;
    this.errorMaker = errorMaker;
  }
  
  reset() {
    this.idle = true;
    this.success = false;
    this.busy = false;
    
    this.data = null;
    this.error = null; 
  }
  
  start() {
    if (this.busy) return;
    this.reset();
    this.busy = true;
  }
  
  async send(promise) {
    this.start();
    const { data, error } = await awaiter(promise);
    
    if (data) this.pass(data);
    if (error) this.fail(error);
    
    return Promise.resolve({ data, error });
  }
  
  pass(data = null) {
    this.success = true;
    this.busy = false;
    this.data = data;
  }
  
  fail(error) {
    this.busy = false;
    this.error = this.errorMaker(error);
  }
  
  get state() {
    return this.busy ? 'BUSY'
    : this.success ? 'PASSED'
    : this.error ? 'FAILED'
    : 'IDLE'
  }
}

function getError(error) {
  const message = 'Request failed';

  if (!error) return { message }

  if (isString(error)) {
    return { message: error }
  }

  if (error?.response) {
    return {
      message: error.response?.data?.message || message
    }
  }

  if (error?.request) {
    return {
      message: error.request
    }
  }

  if (error?.message) {
    return {
      message: error.message
    }
  }

  return { message: error }
}

module.exports = {
  ReqHelper
}
