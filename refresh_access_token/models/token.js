import { DataTypes } from "sequelize";
import sql from "../config/db.js";
import User from "./user.js";

const Token = sql.define(
  "Token",
  {
    tid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uid: {
      type: DataTypes.INTEGER,
      unique: true,
      references: {
        model: User,
        key: "uid",
      },
    },
  },
  {
    timestamps: false,
    tableName: "token",
  }
);

export default Token;
