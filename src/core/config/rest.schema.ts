import convict from 'convict';
import validator from 'convict-format-with-validator';


convict.addFormats(validator);

export type RestSchema = {
  APP_PORT: number;
  SALT: string;
  DB_HOST: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_PORT: number;
  DB_NAME: string;
  UPLOAD_DIRECTORY: string;
}

export const configurationSchema = convict<RestSchema>({
  DB_HOST: {
    doc: 'The database ip address',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: '127.0.0.1'
  },
  DB_USER: {
    doc: 'The database username',
    format: 'String',
    env: 'DB_USER',
    default: null
  },
  DB_PASSWORD: {
    doc: 'The database password',
    format: 'String',
    env: 'DB_PASSWORD',
    default: null
  },
  DB_PORT: {
    doc: 'The database port',
    format: 'port',
    env: 'DB_PORT',
    default: 21017
  },
  DB_NAME: {
    doc: 'The database name',
    format: 'String',
    env: 'DB_NAME',
    default: null
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
  },
  UPLOAD_DIRECTORY: {
    doc: 'The secret',
    format: 'String',
    env: 'UPLOAD_DIRECTORY',
    default: null
  }
});
