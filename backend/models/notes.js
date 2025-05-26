import { Sequelize } from "sequelize";
import db from "../config/database.js";
import User from "./user.js";

const { DataTypes } = Sequelize;

const Note = db.define("note", {
  title: DataTypes.STRING,
  content: DataTypes.STRING,
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
  },
  {
    timestamps: true,
  }
);

User.hasMany(Note, {foreignKey: "user_id"});
Note.belongsTo(User, {foreignKey: "user_id"});

export default Note;
