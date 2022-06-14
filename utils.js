import fs from 'fs';

export function readRequest(req){
  return new Promise((res, rej) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      res(body);
    })
  })
}

export function addNewUser(content) {
  fs.writeFileSync('data/users.json',JSON.stringify(content), 'utf-8');
}
