const EventEmitter = require('eventemitter2');

const { isDef } = require('./types');
const { saveJson, readJson } = require('./misc');

class JsonState extends EventEmitter {
  constructor({ 
    data = {},
    userOpts = {},
    stateFile = 'state.json',
    onLog = v => {}, 
    onChange = v => {}, 
    onError = v => {}, 
    onInit = v => {},
  } = {}) {
    super();
    this.stateFile = stateFile;
    this.data = data;
    this.userOpts = userOpts;
    this.dataKeys = Object.keys(data);
    this.savedAt = 0;

    this.on('log', onLog);
    this.on('error', onError);
    this.on('init', onInit);
    this.on('change', onChange);
  }

  init() {
    this.load();
    this.emit('log', 'State did init');
    this.emit('init', this.data);
  }

  load() {
    try {
      let saved = readJson(this.stateFile, true) || { data: {} };
      if (!saved.data) saved = { data: {} };

      this.dataKeys.forEach(k => {
        this.data[k] = isDef(saved.data[k]) ? saved.data[k] : this.data[k];
      });

      this.save();
    } catch (e) {
      throw e;
    }
  }

  save(obj) {
    if (obj) {
      for(let k in obj) {
        this.data[k] = obj[k];
      }
    }

    this.savedAt = Date.now();
    saveJson(this.stateFile, this.public);
    this.emit('change', this.public);
  }

  makeUserOpts() {
    let opts = {...this.userOpts};

    for(let key in opts) {
      opts[key] = {
        key,
        busy: false,
        desc: '',
        edit: false,
        enabled: true,
        title: '',
        value: this.data[key],
        ...opts[key],
      }
    }

    for(let key in opts) {
      const opt = opts[key];
      if (opt.type === 'Array') {
        opt.value = opt.value.join(',');
      }
    }

    return opts;
  }

  saveOpt(key, value) {
    this.data[key] = value;
    this.save();
  }

  get opts() {
    return this.makeUserOpts()
  }

  get public() {
    return {
      opts: this.opts,
      data: this.data
    }
  }
}

module.exports = { JsonState }
