export interface ConfigInterface {
  get(constEnv: string): string | undefined;
}
