import { createServer, IncomingMessage, ServerResponse } from 'http';
import cluster from 'cluster';
import os from 'os';
import dotenv from 'dotenv';
import {
  getAllUsersController,
  getUserByIdController,
  createUserController,
  updateUserController,
  deleteUserController
} from './controllers/usersControllers';

dotenv.config();

const isMultiServer = process.argv.some((item) => item === '--multi');

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  if (cluster.isWorker)
    console.log(
      `Worker ${cluster.worker?.id} handle request`
    );
  if(req.url === '/api/users' && req.method === 'GET') {
    
    getAllUsersController(req, res);
  } else if (req.url && req.url.match(/\/api\/users\/([0-9a-z]+)/) && req.method === 'GET') {

    getUserByIdController(req, res);
  } else if(req.url === '/api/users' && req.method === 'POST') {

    createUserController(req, res);
  } else if(req.url && req.url.match(/\/api\/users\/([0-9a-z]+)/) && req.method === 'PUT') {

    updateUserController(req, res);
  } else if(req.url && req.url.match(/\/api\/users\/([0-9a-z]+)/) && req.method === 'DELETE') {

    deleteUserController(req, res);
  } else {

    res.writeHead(404, {'Content-Type': 'application/json'});
    res.end(JSON.stringify({message: 'Resource do not found'}));
  }
});

if(!isMultiServer){
  server.listen(process.env.PORT);
} else {
  if (cluster.isPrimary) {
    let cpus = os.cpus().length;
  
    for (let i = 0; i < cpus; i++) {cluster.fork();}
  
    cluster.on('exit', (worker, code) => {
      console.log(
        `Worker ${worker.id} finished. Exit code: ${code}`
      );
  
      server.listen(process.env.PORT, () => {
        console.log(`Worker ${cluster.worker?.id} launched`)
      });
    });
  } else
  server.listen(process.env.PORT, () => {
    console.log(`Worker ${cluster.worker?.id} launched`)
  });
}
//server.listen(process.env.PORT); 