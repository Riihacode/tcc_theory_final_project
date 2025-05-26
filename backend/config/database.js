import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
// const db = new Sequelize("note", "root","admin123", {
//   host: "34.27.42.159",
//   dialect: "mysql",
// });

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

export default db;
