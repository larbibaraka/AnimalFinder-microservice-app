//call express
const express = require("express");

const service = express();

module.exports = config => {
  const log = config.log();
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
      next("Not Implemented");
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
