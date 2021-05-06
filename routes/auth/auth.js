import {Router} from 'express'
import User from '../../models/user.js';
import authController from './authController.js';
import {hash} from 'bcrypt';

const auth = Router();
const authCandidat = new authController()

auth.post('/reg', authCandidat.register);
auth.post('/log', authCandidat.login);


export default auth;
