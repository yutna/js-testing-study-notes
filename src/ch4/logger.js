const fs = require("fs");

const logger = {
  log: (msg) => fs.appendFileSync(__dirname + "/tmp/logs.out", msg + "\n"),
};

module.exports = logger;
