import { DatabaseClientInterface } from './database-client.interface';
import mongoose, { Mongoose } from 'mongoose';
import { inject, injectable } from 'inversify';
import { LoggerInterface } from '../logger/logger.interface';
import { APPLICATION_DEPENDENCIES } from '../../types/application.dependencies.js';
import { setTimeout } from 'node:timers/promises';

const RETRY_COUNT = 5;
const RETRY_TIMEOUT = 1000;

@injectable()
export default class MongoClientService implements DatabaseClientInterface {
  private isConnected = false;
  private mongooseInstance: Mongoose | null = null;

  constructor(@inject(APPLICATION_DEPENDENCIES.LoggerInterface) private logger: LoggerInterface) {
  }

  private async _disconnect() {
    await this.mongooseInstance?.disconnect();
    this.mongooseInstance = null;
    this.logger.info('The disconnection from the database has been completed.')
  }

  private async _connectWithRetry(uri: string): Promise<Mongoose> {
    let attempt = 0;
    while (attempt < RETRY_COUNT) {
      try {
        return await mongoose.connect(uri);
      } catch (error) {
        attempt++;
        this.logger.error(`Failed to connect to the database. Attempt ${attempt}`);
        await setTimeout(RETRY_TIMEOUT);
      }
    }

    this.logger.error(`Unable to establish database connection after ${attempt}`);
    throw new Error('Failed to connect to the database');
  }

  public async connect(url: string): Promise<void> {
    if (this.isConnected) {
      this.logger.error('The connection to the database has already been established.')
    }
    if (!this.isConnected) {
      this.logger.info('Trying connect');
      await this._connectWithRetry(url);
      this.logger.info('Connect has been complete');

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
