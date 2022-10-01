const Schema = require('validate');
const { isEmpty } = require('./types');

function illegalKeys(schema, obj) {
  if (!schema || !obj) throw 'schema and object required!';

  const schemaKeys = Object.keys(schema);
  const objKeys = Object.keys(obj);

  return objKeys.filter(k => !schemaKeys.includes(k));
}

function hasIllegalKeys(schema, obj) {
  return illegalKeys(schema, obj).length > 0
}

function validateObj(schema, obj) {
  if (isEmpty(schema) || isEmpty(obj)) return { message: 'Schema and object cannot be empty!' }

  const ik = illegalKeys(schema, obj);

  if (ik.length) return { message: `Some illegal key(s) were found i.e [${ik}]` };

  const errors = new Schema(schema).validate(obj);

  if (!errors.length) return null;

  return { 
    fields: errors.map(e => ({ message: e.message, field: e.path })),
    message: `${errors.length} field(s) failed validation!`
  }
}

module.exports = {
  illegalKeys,
  hasIllegalKeys,
  validateObj
}
