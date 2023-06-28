import * as crypto from 'node:crypto';
import { ClassConstructor, plainToInstance } from 'class-transformer';

export function getRandomValue(min: number, max: number): number {
  return Math.round(Math.random() * (max - min)) + min;
}

export function getRandomItems<T>(items: T[]): T[] {
  const start = getRandomValue(1, items.length - 1);
  const end = getRandomValue(start + 1, items.length - 1);

  return items.slice(start, end);
}

export function getRandomItem<T>(items: T[]): T {
  const index = getRandomValue(0, items.length - 1);

  return items[index];
}

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }
  return 'Unknown Error';
}

export function createSha256(line: string, salt: string) {
  const shaHasher = crypto.createHmac('sha256', salt);
  return shaHasher.update(line).digest('hex');
}

export function fillDto<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});
}

export function createError(message: string) {
  return {
    error: message
  };
}
