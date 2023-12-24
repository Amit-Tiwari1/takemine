// signInRouter.js
import express from 'express';
import * as signInController from '../controllers/signInController.js';

const router = express.Router();

router.post('/signin', signInController.signIn);

export default router;
