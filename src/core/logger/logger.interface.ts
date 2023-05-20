export interface LoggerInterface {
  debug(message: string, ...arg: unknown[]): void;
  info(message: string, ...arg: unknown[]): void;
  warn(message: string, ...arg: unknown[]): void;
}
