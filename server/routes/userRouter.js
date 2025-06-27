import express from 'express';
const router = express.Router();
import { logout, signin, signup } from "../controllers/authController.js"
import isLoggedIn from '../middlewares/isLoggedIn.js';
import isAdmin from '../middlewares/isAdmin.js';

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/logout',isLoggedIn, logout)

export default router