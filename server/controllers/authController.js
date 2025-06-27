import express from 'express'
import userModel from '../models/userModel.js'
import bcrypt from "bcrypt";
import generateToken from '../utils/generateToken.js';

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (user) return res.status(401).json({ message: "User already exists." });

        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                console.error("Salt generation error:", err);
                return res.status(500).json({ message: "Error generating salt", error: err });
            }

            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) {
                    console.error("Hashing error:", err);
                    return res.status(500).json({ message: "Error hashing password", error: err });
                }

                try {
                    const newUser = await userModel.create({
                        name,
                        email,
                        password: hash,
                        isAdmin: false,
                    });

                    const token = generateToken(newUser);
                    res.cookie("token", token);
                    res.status(200).json({ message: "User Created Successfully" });
                } catch (dbErr) {
                    console.error("DB Error:", dbErr);
                    return res.status(500).json({ message: "Error saving user", error: dbErr });
                }
            });
        });

    } catch (error) {
        console.error("Outer catch error:", error);
        return res.status(500).json({
            message: "Error in signing up user, try again later.",
            error,
        });
    }
};

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required." })
        }
        let user = await userModel.findOne({ email })
        if (!user) return res.status(400).json({ message: "Email or password incorrect." })
        bcrypt.compare(password, user.password, function (err, result) {
            if (result) {
                let token = generateToken(user)
                res.cookie("token", token)
                res.status(200).json({ message: "Login Successfully", token });
            }
            else {
                return res.status(401).json({ message: "Email or password incorrect." })
            }
        });
    } catch (error) {
        return res.status(400).json({ message: "Error signing , try again." })
    }
}
