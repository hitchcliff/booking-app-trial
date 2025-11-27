import "dotenv/config";
import path from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import { entities } from "../entities/entities";

// reject ssl on production when requesting to db
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

export const options = {
  type: "postgres",
  url: process.env.DB_URL,
  synchronize: true,
  logging: true,
  subscribers: [],
  entities,
  migrations: [path.join(__dirname, "./migrations/*")],
} as DataSourceOptions;

export const AppDataSource = new DataSource(options);
