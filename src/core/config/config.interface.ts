import { RestSchema } from './rest.schema.js';

export type ConstEnv = keyof RestSchema

export interface ConfigInterface<U> {
  get<T extends keyof U>(key: T): U[T];
}
