export const APPLICATION_DEPENDENCIES = {
  RestApplication: Symbol.for('RestApplication'),
  LoggerInterface: Symbol.for('LoggerInterface'),
  ConfigService: Symbol.for('ConfigService'),
  DatabaseClientInterface: Symbol.for('DatabaseClientInterface'),
  UserServiceInterface: Symbol.for('UserServiceInterface'),
  UserModel: Symbol.for('UserModel'),
  RentalServiceInterface: Symbol.for('RentalServiceInterface'),
  RentalModel: Symbol.for('RentalModel')
} as const;
