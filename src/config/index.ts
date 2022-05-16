import { Environment } from "../types";
import type { AppConfig, UserConfig } from "../types";

let __appConfig: AppConfig = {
  mode: Environment.DEVELOPMENT,
  host: process.env.HOST ?? "0.0.0.0",
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 8055,
  public_url: Environment.DEVELOPMENT
    ? process.env.DIRECTUS_URL ?? "http://localhost:8055"
    : process.env.PUBLIC_URL ?? "http://localhost:8055",
};

export const setAppConfig = (config: UserConfig) => {
  __appConfig = Object.assign({}, __appConfig, config);
};

export const getAppConfig = (): AppConfig => ({ ...__appConfig });
