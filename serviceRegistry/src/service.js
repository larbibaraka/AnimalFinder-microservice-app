//call express
const express = require("express");

const service = express();

const ServiceRegistry = require('./lib/ServiceRegistry');

module.exports = config => {
  const log = config.log();

  const serviceRegistry = new ServiceRegistry(log);  



  // Add a request logging middleware in development mode
  if (service.get("env") === "development") {
    service.use((req, res, next) => {
      log.debug(`${req.method}: ${req.url}`);
      return next();
    });
  }

  //setting up routes of the service registery
  /**
   * this route is for registring the service
   */
  service.put(
    "/register/:servicename/:serviceversion/:serviceport",
    (req, res, next) => {
      const {servicename, serviceversion, serviceport} = req.params;
      //test if the ip is ipv4 or ipv6
      const serviceip = req.connection.remoteAddress.includes('::') ? `[${req.connection.remoteAddress}]` : req.connection.remoteAddress;
      const serviceKey = serviceRegistry.register(servicename, serviceversion, serviceip, serviceport);
      
      res.json({
          key : serviceKey
      })
    }
  );

  /**
   * this route is for un-registring or delete the service
   */
  service.delete(
    "/register/:servicename/:serviceversion/:serviceport",
    (req, res, next) => {
      next("Not Implemented");
    }
  );
  /**
   * this route is for find where the service is
   */
  service.get(
    "/find/:servicename/:serviceversion",
    (req, res, next) => {
      next("Not Implemented");
    }
  );

  service.use((error, req, res, next) => {
    res.status(error.status || 500);
    // Log out the error to the console
    log.error(error);
    return res.json({
      error: {
        message: error.message
      }
    });
  });
  return service;
};
