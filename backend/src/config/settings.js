import { config } from "dotenv";
config();

export const settings = {
  PORT: process.env.PORT,
  BASE_URL: process.env.BASE_URL,
  DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
};
