export const APPLICATION_DEPENDENCIES = {
  RestApplication: Symbol.for('RestApplication'),
  LoggerInterface: Symbol.for('LoggerInterface'),
  ConfigService: Symbol.for('ConfigService'),
  DatabaseClientInterface: Symbol.for('DatabaseClientInterface')
} as const;
