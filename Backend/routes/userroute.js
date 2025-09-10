import express from 'express';
import { authenticationToken } from '../middelware/auth_middelware.js';
const route = express.Router();
import upload from '../middelware/upload.js';

import {
  signupUser,
  loginUser,
  logoutUser,
} from '../controller/userController.js';
import {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
  countEmployees,
} from '../controller/employeeController.js';

import {
  createLead,
  getLeads,
  updateLead,
  deleteLead,
  countLeads,
} from '../controller/leadController.js';

import { searchLeadsAndEmployees } from '../controller/searchController.js';

route.post('/signup', signupUser);
route.post('/login', loginUser);
route.post('/logout', authenticationToken, logoutUser);

// Employee routes
route.post('/addemployee', createEmployee);
route.get('/allemployees', getEmployees);
route.put('/updateemployee/:id', updateEmployee);
route.delete('/deleteemployee/:id', deleteEmployee);

//leads
route.post('/addlead', upload.single('image'), createLead);
route.get('/allleads', getLeads);
route.put('/updatelead/:id', upload.single('image'), updateLead);
route.delete('/deletelead/:id', deleteLead);

// Count routes
route.get('/employees/count', countEmployees);
route.get('/leads/count', countLeads);

// Search routes
route.get('/search', searchLeadsAndEmployees);

export default route;
