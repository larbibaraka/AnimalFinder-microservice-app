const bunyan = require("bunyan");
//load package.json
const pjs = require("../package.json");
// get name and verion of the service registry app
const { name, version } = pjs;

//Set up Logger
const getLogger = (serviceName, serviceVersion, level) =>
  bunyan.createLogger({
    name: `${serviceName}:${serviceVersion}`,
    level
  });

// Configuration Options for different environments

module.exports = {
  development: {
    name,
    version,
    serviceTimeout: 30,
    log: () => getLogger(name, version, "debug")
  },
  production: {
    name,
    version,
    serviceTimeout: 30,
    log: () => getLogger(name, version, "info")
  },
  test: {
    name,
    version,
    serviceTimeout: 30,
    log: () => getLogger(name, version, "fatal")
  }
};
