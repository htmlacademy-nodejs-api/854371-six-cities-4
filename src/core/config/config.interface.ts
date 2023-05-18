import { RestSchema } from './rest.schema.js';

export type ConstEnv = keyof RestSchema

export interface ConfigInterface {
  get(constEnv: ConstEnv): string | undefined;
}
