import {Router} from 'express'
import authController from './authController.js';


const auth = Router();
const authCandidat = new authController()

auth.post('/reg', authCandidat.register);
auth.post('/log', authCandidat.login);


export default auth;
