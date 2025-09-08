import express from 'express';
const route = express.Router();
import { signupUser, loginUser } from '../controller/ User.controller.js';

route.post('/signup', signupUser);
route.post('/login', loginUser);

export default route;
