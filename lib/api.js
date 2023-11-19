const axios = require('axios').default
const { isString, isEmpty } = require('./types')

/**
 * @typedef {Object} IErrorObj
 * @property {string} message - The error message.
 * @property {string} code - The error code.
 * @property {number} status - The HTTP status code.
 * @property {string} [stack] - The error stack trace (optional).
 */

class ErrorObj {
    constructor({ message, code, status, statusText, stack }) {
        this.code = code ? code.toString() : 'UNK'
        this.status = status ? status : 504
        this.message = message ? message : statusText ? statusText : 'Unkown Error!'
        this.stack = stack
    }
}

/**
 * Returns a consistent error object.
 * @returns {IErrorObj} The error object.
 */
export function getError(error) {
    if (isString(error)) return ErrorObj({ message: error })

    if (axios.isAxiosError(error)) {
        if (error.response) {
            const { code, data, status, statusText } = error.response

            if (!isEmpty(data)) return new ErrorObj(data)

            return new ErrorObj({
                code: code ? code : error.code,
                status: status ? status: error.status,
                statusText: statusText ? statusText: error.statusText,
                stack: error.stack,
                message: error.message
            })
        } else if (error.request) {
            if (error.code === 'EAI_AGAIN') return new ErrorObj({...error, message: 'Network error! Check the URL or your internet connection'})
            return new ErrorObj(error)
        } else {
            return new ErrorObj(error)
        }
    }
}
