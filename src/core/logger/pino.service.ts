import { LoggerInterface } from './logger.interface.js';
import pino from 'pino';

export default class PinoService implements LoggerInterface {
  constructor(private logger = pino()) {}

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
