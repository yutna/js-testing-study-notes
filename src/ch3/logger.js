const pino = require("pino");

const pinoInstant = pino();
const logger = {
  logInfo: pinoInstant.info.bind(pinoInstant),
  logError: pinoInstant.error.bind(pinoInstant),
};

module.exports = logger;
