import { getRandomItem } from './utils.js';
import { AutoUserType } from '../types/auto-user.js';

const emailAddresses = [
  'john@gmail.com',
  'sarah@yahoo.com',
  'david@outlook.com',
  'emily@hotmail.com',
  'michael@aol.com',
  'jessica@protonmail.com',
  'robert@mail.com',
  'lisa@icloud.com',
  'william@yandex.com',
  'amanda@live.com',
  'andrew@inbox.com',
  'laura@gmx.com',
  'matthew@fastmail.com',
  'jennifer@zoho.com',
  'chris@rocketmail.com',
  'ashley@mail.ru',
  'jason@yandex.ru',
  'melissa@protonmail.ch',
  'ryan@outlook.com',
  'michelle@google.com'
];

function getRandomEmail(): string {
  return getRandomItem<string>(emailAddresses);
}

function createUserAvatar(): string {
  return `https://api.dicebear.com/6.x/avataaars/jpg?seed=${Math.round(Math.random() * 100000)}`;
}

export function createUser() {
  const autoUser: AutoUserType = {
    password: 'pass123456',
    avatar: createUserAvatar(),
    userType: 'base',
    email: getRandomEmail(),
    name: getRandomEmail().split('@')[0]
  };

  return ({
    name: autoUser.name,
    email: autoUser.email,
    password: autoUser.password,
    avatarUrl: autoUser.avatar,
    userType: autoUser.userType
  });
}
