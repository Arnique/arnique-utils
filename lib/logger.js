const fs = require('fs');
const chalk = require('chalk');
const SimpleNodeLogger = require('simple-node-logger');

const { cleanArgs } = require('./misc');
const { timeStamp } = require('./date');

function makeText(args, name) {
  let text = cleanArgs(args).join(' ');
  return name ? `[${name}] ${text}` : text;
}

function format(text) {
  return `${timeStamp().timeString} ${text}`;
}

class FileLogger {
  constructor({ dir = './logs', name = '' } = {}) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    const manager = new SimpleNodeLogger();
    manager.createRollingFileAppender({
      logDirectory: dir,
      fileNamePattern: '<DATE>.log',
      dateFormat: 'YYYY.MM.DD',
    });

    this.name = name;
    this.logger = manager.createLogger();
  }

  log(...args) {
    let text = makeText(args, this.name);
    console.log(format(text));
    this.logger.info(text);
  }

  info(...args) {
    let text = makeText(args, this.name);
    console.log(chalk.blueBright(format(text)));
    this.logger.info(text);
  }

  error(...args) {
    let text = makeText(args, this.name);
    console.log(chalk.redBright(format(text)));
    this.logger.error(text);
  }

  success(...args) {
    let text = makeText(args, this.name);
    console.log(chalk.greenBright(format(text)));
    this.logger.info(text);
  }

  warn(...args) {
    let text = makeText(args, this.name);
    console.log(chalk.yellow(format(text)));
    this.logger.warn(text);
  }

  test() {
    ['log','info','warn','error'].forEach(m => this[m](`This is what ${m}() prints...`));
  }
}

module.exports = {
  FileLogger
}
