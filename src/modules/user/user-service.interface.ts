import CreateUserDto from './dto/create-user.dto.js';
import { DocumentType } from '@typegoose/typegoose';
import { UserEntity } from './user.entity.js';
import UpdateUserDto from './dto/update-user.dto.js';

export interface UserServiceInterface {
  /**
   * Создать нового пользователя с данными `dto`
   * @param dto объект с данными пользователя
   * @param salt строка для кодирования паролей
   */
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>

  /**
   * Найти пользователя по `email`
   * @param email электронная почта пользователя
   */
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>

  /**
   * Найти или создать пользователя
   * @param dto объект с данными пользователя
   * @param salt строка для кодирования паролей
   */
  findOrCreate(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>

  /**
   * Обновить пользователя в базе данных
   * @param dto объект с данными пользователя
   * @param salt строка для кодирования паролей
   */
  findByEmailAndUpdate(dto: UpdateUserDto, salt: string): Promise<DocumentType<UserEntity> | null>
}
