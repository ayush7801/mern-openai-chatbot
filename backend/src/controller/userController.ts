import { Request, Response, NextFunction } from "express";
import { compare, hash } from "bcrypt";
import User from "../models/userModels.js"; // Import the User model
import { createToken } from "../utils/token-manager.js";
import { Constants } from "../constants/constants.js";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // code to get all users
        const allUsers = await User.find();
        res.status(200).json({
            status: 'success',
            data: allUsers
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
}

const userSignup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // User Signup
        const { name, email, password } =  req.body;
        const ifExistingUser = await User.find({ email });
        if(ifExistingUser.length > 0) {
            return res.status(409).json({
                status: 'fail',
                message: 'User already exits with this email'
            });
        }
        const hashedPassword = await hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        // clear previous cookies and send new cookie with jwt token
        res.clearCookie(Constants.AUTH_COOKIE_NAME, {
            path: '/',
            domain: Constants.DOMAIN_NAME,
            signed: true,
            httpOnly: true
        });
        // this payload will be encypted in jwt token
        const payload = {
            id: newUser._id,
            email: newUser.email
        }
        const token = createToken(payload, '7d');
        res.cookie(Constants.AUTH_COOKIE_NAME, token, { 
            path: '/',
            domain: Constants.DOMAIN_NAME,
            signed: true,
            sameSite: 'none',
            secure: true,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true 
        });
        
        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            userId: newUser._id.toString(),
            name: newUser.name,
            email: newUser.email
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
}

const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // User Login
        const { email, password } = req.body;
        const user = await User.find({ email });

        if (user.length == 1) {
            const isCorrectPassword = await compare(password, user[0].password);
            if(!isCorrectPassword) {
                res.status(401).json({
                    status: 'fail',
                    message: 'Invalid password!!!'
                });
            } else {
                const currentUser = user[0];

                // clear previous cookies and send new cookie with jwt token
                res.clearCookie(Constants.AUTH_COOKIE_NAME, {
                    path: '/',
                    domain: Constants.DOMAIN_NAME,
                    signed: true,
                    httpOnly: true
                });
                const payload = {
                    id: currentUser._id,
                    email: currentUser.email
                }
                const token = createToken(payload, '7d');
                res.cookie(Constants.AUTH_COOKIE_NAME, token, { 
                    path: '/',
                    domain: Constants.DOMAIN_NAME,
                    signed: true,
                    sameSite: 'none',
                    secure: true,
                    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    httpOnly: true 
                });

                // set final response
                res.status(200).json({
                    status: 'success',
                    message: 'User logged in successfully',
                    userId: currentUser._id.toString(),
                    name: currentUser.name,
                    email: currentUser.email
                });
            }
        } 
        else if (user.length > 1) {
            res.status(500).json({
                status: 'fail',
                message: 'Multiple users found with the same email'
            });
        } 
        else {
            res.status(401).json({
                status: 'fail',
                message: 'Invalid email or password'
            });
        }
    }catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
}

const userAuthStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // User Authentication Status
        const user = await User.findById(res.locals.jwtdata.id);
        if(!user) {
            res.status(401).json({
                status: 'fail',
                message: 'Token is valid but user not found'
            });
        }
        else if(user._id.toString() !== res.locals.jwtdata.id) {
            res.status(403).json({
                status: 'fail',
                message: `Permission didn't match`
            });
        }
        else{
            // set final response
            res.status(200).json({
                status: 'success',
                message: 'User logged in successfully',
                userId: user._id.toString(),
                name: user.name,
                email: user.email
            });
        }
    }catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
}

const userLogout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // User Logout
        res.clearCookie(Constants.AUTH_COOKIE_NAME, {
            path: '/',
            domain: Constants.DOMAIN_NAME,
            signed: true,
            httpOnly: true
        });
        res.status(200).json({
            status: 'success',
            message: 'User logged out successfully'
        });
    }catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
}

export { getAllUsers, userSignup, userLogin, userAuthStatus, userLogout}