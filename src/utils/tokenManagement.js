require('dotenv').config();
const jwt = require('jsonwebtoken');
const { token_secret } = require('./keys');

const generateToken = (data) => {
  const access_token = jwt.sign(data, token_secret, {
    expiresIn: '6h',
  });
  const refresh_token = jwt.sign(data, token_secret, {
    expiresIn: '1d',
  });
  return {
    access_token,
    refresh_token,
  };
};

const generateAdminToken = (data) => {
  const access_token = jwt.sign(data, token_secret, {
    expiresIn: '6h',
  });
  const refresh_token = jwt.sign(data, token_secret, {
    expiresIn: '1d',
  });
  return {
    access_token,
    refresh_token,
  };
};

const verifyToken = (token) => {
  const data = jwt.verify(token, token_secret);
  return data;
};

module.exports = {
  generateToken,
  generateAdminToken,
  verifyToken,
};
