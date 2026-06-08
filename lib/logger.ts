import pino from "pino";

const logger = pino({
  level: process.env.NODE_ENV !== "production" ? "debug" : "info",
  transport: process.env.NODE_ENV !== "production" ? {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  } : undefined,
});

export default logger;
