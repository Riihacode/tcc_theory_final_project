import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const User = db.define("user",
{
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  refresh_token: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}
);

export default User;
