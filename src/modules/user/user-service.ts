import { UserServiceInterface } from './user-service.interface.js';
import CreateUserDto from './dto/create-user.dto.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { UserEntity } from './user.entity.js';
import { inject, injectable } from 'inversify';
import { APPLICATION_DEPENDENCIES } from '../../types/application.dependencies.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import UpdateUserDto from './dto/update-user.dto.js';

@injectable()
export default class UserService implements UserServiceInterface {
  constructor(
    @inject(APPLICATION_DEPENDENCIES.LoggerInterface) private logger: LoggerInterface,
    @inject(APPLICATION_DEPENDENCIES.UserModel) private userModel: types.ModelType<UserEntity>
  ) {}

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);

    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    const result = this.userModel.findOne({email: email});
    this.logger.info(`User with email ${email} found in the database.`);
    return result;
  }

  public async findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const existedUser = await this.findByEmail(dto.email);

    if (existedUser) {
      this.logger.info(`findByEmail: User with email ${dto.email} found.`);
      return existedUser;
    }

    return this.create(dto, salt);
  }

  public async findByEmailAndUpdate(dto: UpdateUserDto, salt: string): Promise<DocumentType<UserEntity> | null> {
    const user = await this.findByEmail(dto.email);
    if (user) {
      const updatedUser = new UserEntity(user);
      if (dto.password) {
        updatedUser.setPassword(dto.password, salt);
      }
      return this.userModel.findOneAndUpdate({email: dto.email}, updatedUser, {new: true});
    } else {
      this.logger.info(`findByEmailAndUpdate: The user with email ${dto.email} was not found`);
      return user;
    }
  }

  public async deleteUser(email: string): Promise<DocumentType<UserEntity> | null> {
    const result = await this.userModel.findOneAndDelete({email});
    if (result) {
      this.logger.info(`deleteUser: The user with email ${email} has been deleted`);
    } else {
      this.logger.info(`deleteUser: The user with email ${email} was not found`);
    }
    return result;
  }
}
