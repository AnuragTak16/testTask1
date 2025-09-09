import express from 'express';
import { authenticationToken } from '../middelware/auth_middelware.js';
const route = express.Router();

import {
  signupUser,
  loginUser,
  logoutUser,
} from '../controller/userController.js';
import {
  createEmployee,
  getEmployees,
} from '../controller/employeeController.js';

route.post('/signup', signupUser);
route.post('/login', loginUser);
route.post('/logout', authenticationToken, logoutUser);

// Employee routes
route.post('/addemployee', createEmployee);
route.get('/allemployees', getEmployees);

export default route;
