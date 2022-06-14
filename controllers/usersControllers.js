import {v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { readRequest } from '../utils.js';
import {
  getAllUsersModel,
  getUserByIdModel,
  addNewUserModel,
  updateUserModel,
  deleteUserModel
} from '../models/usersModel.js';

export async function getAllUsersController(req, res) {
  try {
    const people = await(getAllUsersModel());
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(people));
  } catch (error) {
    throwError500(error, res);
  }
  
}

export async function getUserByIdController(req, res) {
  try {
    const id = req.url.split('/')[3];
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
  } catch (error) {
    throwError500(error, res);
  }
}

export async function createUserController(req, res) {
  try {
    const body = JSON.parse(await(readRequest(req)));
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

export async function updateUserController(req, res) {
  try {
    const id = req.url.split('/')[3];

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
  } catch (error) {
    throwError500(error, res);
  }
}

export async function deleteUserController(req, res) {
  try {
    const id = req.url.split('/')[3];

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
  } catch (error) {
    throwError500(error, res);
  }
}

const throwError500 = (error, res) => {
  res.writeHead(500, {'Content-Type': 'application/json'});
  res.end(JSON.stringify({'message': error}));
}