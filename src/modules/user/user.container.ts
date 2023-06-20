import { Container } from 'inversify';
import UserService from './user-service.js';
import { UserServiceInterface } from './user-service.interface.js';
import { APPLICATION_DEPENDENCIES } from '../../types/application.dependencies.js';
import { UserEntity, UserModel } from './user.entity.js';
import { types } from '@typegoose/typegoose';
import { ControllerInterface } from '../../core/controller/controller-interface.js';
import UserController from './user.controller.js';

export function createUserContainer() {
  const userContainer = new Container();

  userContainer.bind<UserServiceInterface>(APPLICATION_DEPENDENCIES.UserServiceInterface).to(UserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(APPLICATION_DEPENDENCIES.UserModel).toConstantValue(UserModel);
  userContainer.bind<ControllerInterface>(APPLICATION_DEPENDENCIES.UserController).to(UserController).inSingletonScope();

  return userContainer;
}
