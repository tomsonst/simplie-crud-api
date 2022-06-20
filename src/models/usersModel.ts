import { IncomingMessage } from 'http';
import { addNewUser, readRequest } from '../utils';
import { IUser } from '../types';
const users = require('../data/users.json');

export const getAllUsersModel = () => {
  return new Promise((res, rej) => {res(users)});
}

export const getUserByIdModel = (id: string) => {
  return new Promise((res, rej) => {
    const user = users.find((elem:IUser) => elem.id === id);
    res(user);
  })
}

export const addNewUserModel = (newUser: IUser) => {
  return new Promise((res,rej) => {
    users.push(newUser);
    addNewUser(users);
  })
}

export async function updateUserModel(id: string, req: IncomingMessage) {
  const requestMessage = await(readRequest(req));
  const body = typeof requestMessage === 'string' ? JSON.parse(requestMessage) : null;
  return new Promise((res, rej) => {
    const indexUser = users.findIndex((elem:IUser) => elem.id === id);
    if(indexUser !== -1) {
      const updatedUser = {
        id: id,
        username: body.username || users[indexUser].username,
        age: body.age || users[indexUser].age,
        hobbies: body.hobbies || users[indexUser].hobbies
      }
      users[indexUser] = updatedUser;
      addNewUser(users);
      res(updatedUser);
    } else {
      res(null);
    }
  });
}

export const deleteUserModel = (id: string) => {
  return new Promise((res, rej) => {
    const indexUser = users.findIndex((elem:IUser) => elem.id === id);

  if(indexUser !== -1) {
    users.splice(indexUser, 1);
    addNewUser(users);
    res(true);
  } else {
    res(false);
  }
  });
}