class serviceRegistry {
  constructor(log) {
    this.log = log;
    this.services = {};
    this.timeout = 30;
  }

  register(name, version, ip, port) {
    //this key is used to register the service
    //todo we can ecrypt this key
    const key = name + version + ip + port;
    //check if the service does not exist on the services collection or set
    if (!this.services[key]) {
      this.services[key] = {};
      this.services[key].timestamp = Math.floor(new Date() / 1000);
      this.services[key].name = name;
      this.services[key].version = version;
      this.services[key].ip = ip;
      this.services[key].port = port;
      this.log.debug(
        `Addes service ${name}, version ${version} at ${ip}:${port}`
      );
      return key;
    }
    this.services[key].timestamp = Math.floor(new Date() / 1000);
    this.log.debug(
      `updated service ${name}, version ${version} at ${ip}:${port}`
    );

    return key;
  }
}

module.exports = serviceRegistry;
