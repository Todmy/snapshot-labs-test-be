import * as dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // Throw generic error
  throw new Error("Couldn't find .env file");
}

export default {
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  jwtSecret: process.env.JWT_SECRET,
  ethRpcUrl: process.env.ETH_RPC_URL,
  withCache: process.env.WITH_SIMPLE_CACHE === 'true',
};
