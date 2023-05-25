import { DatabaseClientInterface } from './database-client.interface';
import mongoose, { Mongoose } from 'mongoose';
import { inject, injectable } from 'inversify';
import { LoggerInterface } from '../logger/logger.interface';
import { APPLICATION_DEPENDENCIES } from '../../types/application.dependencies.js';

@injectable()
export default class MongoClientService implements DatabaseClientInterface {
  private isConnected = false;
  private mongooseInstance: Mongoose | null = null;

  constructor(@inject(APPLICATION_DEPENDENCIES.LoggerInterface) private logger: LoggerInterface) {
  }

  private async _connect(connectUrl: string) {
    this.logger.info('Establishing connection to the database...')
    this.mongooseInstance = await mongoose.connect(connectUrl);
    this.isConnected = true;
    this.logger.info('The database has been connected')
  }

  private async _disconnect() {
    await this.mongooseInstance?.disconnect();
    this.mongooseInstance = null;
    this.logger.info('The disconnection from the database has been completed.')
  }

  public async connect(url: string): Promise<void> {
    if (this.isConnected) {
      this.logger.error('The connection to the database has already been established.')
    }
    if (!this.isConnected) {
      await this._connect(url);
    }
  }

  public async disconnect() {
    if (!this.isConnected) {
      this.logger.error('The disconnection from the database has already been completed.')
    }
    if (this.isConnected) {
      await this._disconnect();
    }
  }
}
