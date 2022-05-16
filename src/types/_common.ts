export enum Environment {
  DEVELOPMENT = "development",
  PRODUCTION = "production",
}

export interface CommanderArgs {
  mode: Environment;
  cb: () => Promise<void>;
}

export type UserConfig = Partial<AppConfig>;

export interface AppConfig {
  mode: Environment | ImportMetaEnv;
  port: number;
  host: string;
  public_url: string;
}
