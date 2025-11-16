// const success = (res, data, message = 'Success', statusCode = 200) => {
//   return res.status(statusCode).json({
//     success: true,
//     message,
//     data
//   });
// };

// const error = (res, message = 'Error', statusCode = 500, errors = null) => {
//   return res.status(statusCode).json({
//     success: false,
//     message,
//     errors
//   });
// };

// module.exports = { success, error };

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
exports.notFound = (res, message = 'Not found') => {
  return res.status(404).json({
    status: 'fail',
    message: message,
    data: null
  });
}


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

exports.fail = (res, message, code = 400) => {
  let errors = [];
  if (message instanceof ValidationError) {
    const seenFields = new Set(); // using Set to avoid duplicate
    for (const e of message.errors) {
      if (!seenFields.has(e.path)) {
        errors.push({ [e.path]: e.message });
        seenFields.add(e.path);
      }
    }
  } else if (Array.isArray(message)) {
    if (message.length > 0 && typeof message[0] === 'string') {
      errors = message.map(msg => ({ message: msg }));
    } else {
      errors = message;
    }
  } else if (typeof message === 'string') {
    errors = [{ message }];
  }

  return res.status(code).json({
    status: 'fail',
    message: errors,
    data: null
  });
};
