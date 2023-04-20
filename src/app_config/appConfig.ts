import {cleanEnv} from "envalid";
import dotenv from "dotenv";
dotenv.config();
import appConfigSchema from "./appConfigSchema.js";

const appConfig = cleanEnv(process.env, appConfigSchema);

export default appConfig;
