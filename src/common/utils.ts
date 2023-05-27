import * as crypto from 'node:crypto';

export function getRandomValue(min: number, max: number): number {
  return Math.round(Math.random() * (max - min)) + min;
}

export function getRandomItems<T>(items: T[]): T[] {
  const start = getRandomValue(0, items.length - 1);
  const end = getRandomValue(start, items.length - 1);

  return items.slice(start, end);
}

export function getRandomItem<T>(items: T[]): T {
  const index = getRandomValue(0, items.length - 1);

  return items[index];
}

const counter = (start: number) => () => start++;
const counterId = counter(1);

export function getStringUserId(): string {
  return counterId().toString();
}

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }
  return 'Unknown Error';
}

export function createSha256(line: string, salt: string) {
  const shaHasher = crypto.createHmac('sha256', salt)
  return shaHasher.update(line).digest('hex');
}
