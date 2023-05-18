import convict from 'convict';
import validator from 'convict-format-with-validator';


convict.addFormats(validator);

export type RestSchema = {
  APP_PORT: number;
  SALT: string;
  DB_HOST: string;
}

export const configurationSchema = convict<RestSchema>({
  DB_HOST: {
    doc: 'The database ip address',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: '127.0.0.1'
  },
  APP_PORT: {
    doc: 'The application port',
    format: 'port',
    env: 'APP_PORT',
    default: 3000
  },
  SALT: {
    doc: 'The secret',
    format: 'String',
    env: 'SALT',
    default: null
  }
});
