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
const counterId = counter(0);

export function getStringUserId(): string {
  return counterId().toString();
}
