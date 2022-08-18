const httpStatus = require('http-status');
const { abortIf } = require('../utils/responder');

const verify = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  abortIf(
    !token || token !== process.env.FAUX_TOKEN,
    httpStatus.FORBIDDEN,
    'You shall not pass'
  );
  next();
};

module.exports = {
  verify,
};
