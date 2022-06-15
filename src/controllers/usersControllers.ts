import {v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { IncomingMessage, ServerResponse } from 'http';
import { readRequest } from '../utils';
import {
  getAllUsersModel,
  getUserByIdModel,
  addNewUserModel,
  updateUserModel,
  deleteUserModel
} from '../models/usersModel';

export async function getAllUsersController(req: IncomingMessage, res: ServerResponse) {
  try {
    const people = await(getAllUsersModel());
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(people));
  } catch (error) {
    throwError500(error, res);
  }
  
}

export async function getUserByIdController(req: IncomingMessage, res: ServerResponse) {
  try {
    const id = req.url && req.url.split('/')[3];
    if(id){
      const person = await(getUserByIdModel(id));
      if(!uuidValidate(id)){
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({'message': 'Id is invalid'}));
      } else if(person){
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(person));
      } else if(!person){
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({'message': 'Id is not exist'}));
      }
    }
  } catch (error) {
    throwError500(error, res);
  }
}

export async function createUserController(req: IncomingMessage, res: ServerResponse) {
  try {
    const requestMessage = await(readRequest(req));
    const body = typeof requestMessage === 'string' ? JSON.parse(requestMessage) : '';
    if(body.username && body.age && body.hobbies) {
      const newPerson = {id: uuidv4(), ...body}
      addNewUserModel(newPerson);
      res.writeHead(201, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(newPerson));
    } else {
      res.writeHead(400, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({'message': 'Response do not contain required properties'}));
    }
  } catch (error) {
    throwError500(error, res);
  }
}

export async function updateUserController(req: IncomingMessage, res: ServerResponse) {
  try {
    const id = req.url && req.url.split('/')[3];
    if(id){
      if(!uuidValidate(id)){
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({'message': 'Id is invalid'}));
      } else {
        const updatedPerson = await(updateUserModel(id, req));
        if(updatedPerson){
          res.writeHead(201, {'Content-Type': 'application/json'});
          res.end(JSON.stringify(updatedPerson));
        } else {
          res.writeHead(404, {'Content-Type': 'application/json'});
          res.end(JSON.stringify({'message': 'Id does not exist'}));
        }
      }
    }
  } catch (error) {
    throwError500(error, res);
  }
}

export async function deleteUserController(req: IncomingMessage, res: ServerResponse) {
  try {
    const id = req.url && req.url.split('/')[3];

    if(id){
      if(!uuidValidate(id)){
        res.writeHead(400, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({'message': 'Id is invalid'}));
      } else {
        const deletedPerson = await(deleteUserModel(id));
        if(deletedPerson){
          res.writeHead(204, {'Content-Type': 'application/json'});
          res.end();
        } else {
          res.writeHead(404, {'Content-Type': 'application/json'});
          res.end(JSON.stringify({'message': 'Id does not exist'}));
        }
      }
    }
  } catch (error) {
    throwError500(error, res);
  }
}

const throwError500 = (error: unknown, res: ServerResponse) => {
  console.log(error);
  res.writeHead(500, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({'message': 'Code execution error'}));
}