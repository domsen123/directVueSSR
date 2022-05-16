import type { AppConfig } from "../types";

let __appConfig: AppConfig;

export const setAppConfig = (config: AppConfig) => {
  __appConfig = Object.assign({}, config);
};

export const getAppConfig = (): AppConfig => ({
  ...__appConfig,
});
