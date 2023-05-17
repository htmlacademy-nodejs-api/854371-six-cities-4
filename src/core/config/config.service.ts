import { ConfigInterface } from './config.interface.js';

export default class ConfigService implements ConfigInterface {
  constructor(private config: NodeJS.ProcessEnv) {}

  public get(constEnv: string) {
    return this.config[constEnv];
  }
}
