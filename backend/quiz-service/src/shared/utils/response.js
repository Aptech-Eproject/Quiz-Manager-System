/**
 * ===================================
 *          Response Util
 * ===================================
 */


/**
 * --------------------------
 *      Import Module
 * --------------------------
 */
const { ValidationError } = require('sequelize');


/**
 * --------------------------
 *     Success Condition
 * --------------------------
 */
exports.success = (res, message, data = null, code = 200) => {
  return res.status(code).json({
    status: 'success',
    message,
    data
  });
};


/**
 * --------------------------
 *    Not Found Condition
 * --------------------------
 */
exports.notFound = (res, message, code = 404) => {
  return res.status(code).json({
    status: 'not found',
    message,
    data: null
  });
};


/**
 * --------------------------
 *     Error Condition
 * --------------------------
 */
exports.error = (res, message, code = 500) => {
  return res.status(code).json({
    status: 'error',
    message,
    data: null
  });
};