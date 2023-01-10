const fs = require('fs');
const util = require('util');
const { isString, isEmpty } = require('./types');
const { v4 } = require('uuid');
const { nanoid } = require('nanoid/non-secure');
const { customAlphabet } = require('nanoid/non-secure');

const { isAnyObject } = require('./types');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(()=> resolve(), ms));
}

function hideSecret(str, maxVisible = 10) {
  if (!isString(str) || isEmpty(str) || maxVisible < 1) return str;

  const len = str.length;
  let visible = Math.floor(len / 2);
  if (maxVisible) visible = Math.min(visible, maxVisible);
  const hidden = len - visible;
  const stars = '*'.repeat(hidden);

  return str.substring(0, visible) + stars;
}

function readJson(filePath, nullOnError = false) {
  try {
    const text = fs.readFileSync(filePath);
    return JSON.parse(text);
  } catch (e) {
    if (!nullOnError) throw e;
    return null;
  }
}

function saveJson(filePath = '', data = {}) {
  try {
    const json = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, json);
  } catch (e) {
    throw e;
  }
}

function spaceString(str, dist = 4, spacer = '-') {
  if (str.length % dist !== 0) throw 'Spacing not consinstent!';

  let s = '';
  let n = str.length / dist;

  for(var i =0; i < n; i++) {
    let sp = i*dist;
    if (i != 0) s += '-'
    s += str.substring(sp, sp + dist);
  }

  return s;
}

function randId(len = 12) {
  return nanoid(len);
}

function randAlphaNum(len = 12, spacer = 0) {
  const id = customAlphabet('34689ABCDEFGHJKLMNPQRTUVWXY', len);
  const v = id();
  if (spacer) return spaceString(v, spacer);
  return v;
}

function randGuid() {
  return v4();
}

function randNumber(len = 4) {
  const min = Math.pow(10, len - 1) 
  const max = Math.pow(10, len) - 1;
  let v = Math.floor(Math.random() * (max - min + 1) + min);

  if (v == min || v == max) return randNumber(len);
  return v;
}

function randNumberString(len = 4) {
  return randNumber(len).toString();
}

function timeStamp() {
  const d = new Date();
  const ms = d.getTime();
  const iso = d.toISOString();

  const p = iso.replace('T', ':').replace('Z', '').split(':');
  const timeString = `${p[1]}:${p[2]}:${p[3]}`;

  return { ms, iso, timeString };
}

function cleanArgs(args) {
  return args.map(a => isAnyObject(a) ? util.inspect(a) : a );
}

function cascadeArr(arr = []) {
  const a = [...arr];

  a.forEach((v, i) => {
    if (i < a.length && v === null) {
      a[i] = a[i-1];
      console.log(v, a[i-1])
    }
  })

  return a;
}

function cascadeObj(obj = {}) {
  const x = {...obj};
  const keys = Object.keys(x);

  keys.forEach((k, i) => {
    if (i < keys.length && x[k] === null) {
      const pk = keys[i-1];
      x[k] = x[pk];
    }
  })

  return x;
}

async function awaiter(asyncFunc) {
  if (!asyncFunc) return { data: null, error: 'Async function required!' }

  return new Promise(resolve => {
    asyncFunc
      .then(data => {
        resolve({ error: null , data })
      })
      .catch(error => {
        resolve({ error, data: null })
      })
  })
}

module.exports = {
  sleep,
  hideSecret,
  readJson,
  saveJson,
  randNumber,
  randNumberString,
  randGuid,
  randId,
  randAlphaNum,
  spaceString,
  timeStamp,
  cleanArgs,
  cascadeArr,
  cascadeObj,
  awaiter,
}
