import { DaoMongoose } from "./defaultDaoMongoose.js";
import { mongoose, Schema} from "mongoose";

export const SchemaLogger = new mongoose.Schema(
    {
      id: { type: String, unique: true },
      datetime: { type: String, require: true },
      log: { type: String, required: true }
    },
    { versionKey: false }
  );
  
  const loggerModel = mongoose.model("logger", SchemaLogger);
  
  export const lmg = new DaoMongoose(loggerModel);
  


