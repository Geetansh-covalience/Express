import { DataTypes } from "sequelize";
import sql from "../config/db.js";


let user = sql.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    token:{
      type:DataTypes.STRING,
      allowNull:false
    }
  },

  {
    timestamps: true,
  }
);


export default user