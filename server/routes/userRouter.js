import express from 'express';
const router = express.Router();
import { signin, signup } from "../controllers/authController.js"
import isLoggedIn from '../middlewares/isLoggedIn.js';
import isAdmin from '../middlewares/isAdmin.js';

router.post('/signup', signup)
router.post('/signin', signin)

export default router