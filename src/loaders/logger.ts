import { createLogger, format, transports, config } from "winston";

const logger = createLogger({
  levels: config.npm.levels,
  format: format.combine(
    format.splat(),
    format.json(),
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    })
  ),
  transports: [
    new transports.Console({
      level: "info",
      format: format.combine(format.cli(), format.splat()),
    }),
  ],
});

logger.log("info", "hihi");

export default logger;
