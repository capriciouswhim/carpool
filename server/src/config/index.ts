import { readFileSync } from "node:fs";
import { User } from "../model/user.model.js";
import { envs } from "./envs/index.js";
import loggerConfig from "./logger/index.js";
const pkg = JSON.parse(readFileSync("./package.json", { encoding: "utf8" }));

export const config: Partial<TsED.Configuration> = {
  version: pkg.version,
  envs,
  ajv: {
    returnsCoercedValues: true
  },
  passport: {
    disableSession: true,
    userInfoModel: User
  },
  logger: loggerConfig
  // additional shared configuration
};
