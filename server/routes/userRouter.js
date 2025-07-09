import express from 'express';
const router = express.Router();
import { logout, signin, signup } from "../controllers/authController.js"
import isLoggedIn from '../middlewares/isLoggedIn.js';
import isAdmin from '../middlewares/isAdmin.js';
import passport from 'passport';
import { googleAuthCallback } from '../controllers/authController.js';

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login-failed' }),
  googleAuthCallback
);
router.post('/logout', isLoggedIn, logout)

export default router