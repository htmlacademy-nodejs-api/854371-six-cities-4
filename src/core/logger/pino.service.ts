import { LoggerInterface } from './logger.interface.js';
import pino, { Logger } from 'pino';
import { injectable } from 'inversify';

@injectable()
export default class PinoService implements LoggerInterface {
  constructor(private readonly logger: Logger = pino()) {}

  public debug(message: string, ...arg: unknown[]): void {
    this.logger.debug(message, ...arg);
  }

  public warn(message: string, ...arg: unknown[]): void {
    this.logger.warn(message, ...arg);
  }

  public info(message: string, ...arg: unknown[]): void {
    this.logger.info(message, ...arg);
  }
}
