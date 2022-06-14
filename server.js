import http from 'http';
import {
  getAllUsersController,
  getUserByIdController,
  createUserController,
  updateUserController,
  deleteUserController
} from './controllers/usersControllers.js';
import dotenv from 'dotenv';

dotenv.config();

http.createServer((req, res) => {
  if(req.url === '/api/users' && req.method === 'GET') {
    
    getAllUsersController(req, res);
  } else if (req.url.match(/\/api\/users\/([0-9a-z]+)/) && req.method === 'GET') {

    getUserByIdController(req, res);
  } else if(req.url === '/api/users' && req.method === 'POST') {

    createUserController(req, res);
  } else if(req.url.match(/\/api\/users\/([0-9a-z]+)/) && req.method === 'PUT') {

    updateUserController(req, res);
  } else if(req.url.match(/\/api\/users\/([0-9a-z]+)/) && req.method === 'DELETE') {

    deleteUserController(req, res);
  } else {

    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({message: 'Resource do not found'}));
  }
}).listen(process.env.PORT); 