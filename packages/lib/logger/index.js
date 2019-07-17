import Logger from 'pino';

export const logger = Logger({
  prettyPrint: process.env.NODE_ENV === 'development',
});
