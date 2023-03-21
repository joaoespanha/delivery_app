require('dotenv').config();

const environment = process.env.NODE_ENV || "test";

const suffix = {
  prod: "",
  production: "",
  dev: "",
  development: "",
  test: "",
};

const options = {
  host: process.env.HOSTNAME || process.env.MYSQL_HOST || 'containers-us-west-167.railway.app',
  port: process.env.MYSQL_PORT || '7084',
  database: 
    `${process.env.MYSQL_DB_NAME || 'railway'}${suffix[environment] || suffix.test}`,
  username: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'fuAcK16SyCr9AqUiiU2X',
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
};

module.exports = {
  development: {
    ...options,
  },
  test: {
    ...options,
  },
  production: {
    ...options,
  },
};
