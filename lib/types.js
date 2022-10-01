function isUndef(v) {
  return typeof v === 'undefined' || v === null
}

function isDef(v) {
  return !isUndef(v)
}

function isArray(v) {
  return Array.isArray(v);
}

function isObject(v) {
  if (isUndef(v)) return false;
  return v === Object(v) && !isArray(v);
}

function isAnyObject(v) {
  if (isUndef(v)) return false;
  return v === Object(v);
}

function isString(v) {
  if (isUndef(v)) return false;
  return typeof v === 'string'
}

function isEmpty(v) {
  if (isUndef(v)) return true;
  if (isObject(v) && !Object.keys(v).length) return true;
  if (isArray(v) && !v.length) return true;
  if (isString(v) && !v.trim().length) return true;

  return false;
}

module.exports = {
  isArray,
  isAnyObject,
  isDef,
  isObject,
  isUndef,
  isEmpty,
  isString,
}
