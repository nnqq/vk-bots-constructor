import { logger } from './logger';

export const mongoConnect = async (connect: any) => {
  try {
    const { MONGO_URI } = process.env;

    if (!MONGO_URI) {
      logger.fatal('Environment variable MONGO_URI is required');
      process.exit(1);
    }

    await connect(MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    logger.info('Mongo connected');
  } catch (e) {
    logger.fatal(e);
    process.exit(1);
  }
};
