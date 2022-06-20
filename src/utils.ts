import fs from 'fs';
import { IncomingMessage } from 'http';
import { IUser } from './types';

export function readRequest(req: IncomingMessage){
  return new Promise((res, rej) => {
    let body = '';
    req.on('data', (chunk: string) => {
      body += chunk;
    });
    req.on('end', () => {
      res(body);
    })
  })
}

export function addNewUser(user: IUser) {
  fs.writeFileSync('src/data/users.json',JSON.stringify(user), 'utf-8');
}
