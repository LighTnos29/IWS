import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import userModel from '../models/userModel.js';
import dotenv from 'dotenv';
dotenv.config(); // ✅ ensures .env is loaded

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/user/auth/google/callback"
},
    async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await userModel.findOne({ email: profile.emails[0].value });
            if (!user) {
                user = await userModel.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: null,      // no local password
                    isVerified: true     // Google verified email
                    // optional: googleId: profile.id
                });
            }
            return done(null, user);
        } catch (err) {
            return done(err, null);
        }
    }
));

// Required by passport
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    userModel.findById(id, (err, user) => done(err, user));
});
