import { addNewUser, readRequest } from '../utils.js';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const users = require('../data/users.json');

export const getAllUsersModel = () => {
  return new Promise((res, rej) => {res(users)});
}

export const getUserByIdModel = (id) => {
  return new Promise((res, rej) => {
    const user = users.find(elem => elem.id === id);
    res(user);
  })
}

export const addNewUserModel = (newUser) => {
  return new Promise((res,rej) => {
    users.push(newUser);
    addNewUser(users);
  })
}

export async function updateUserModel(id, req) {
  const body = JSON.parse(await(readRequest(req)));
  return new Promise((res, rej) => {
    const indexUser = users.findIndex(elem => elem.id === id);
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

export const deleteUserModel = (id) => {
  return new Promise((res, rej) => {
    const indexUser = users.findIndex(elem => elem.id === id);

  if(indexUser !== -1) {
    users.splice(indexUser, 1);
    addNewUser(users);
    res(true);
  } else {
    res(false);
  }
  });
}