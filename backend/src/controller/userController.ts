import { Request, Response, NextFunction } from "express";
import { compare, hash } from "bcrypt";
import User from "../models/userModels.js"; // Import the User model

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
        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            userId: newUser._id.toString()
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
            }else{
                res.status(200).json({
                    status: 'success',
                    message: 'User logged in successfully',
                    userId: user[0]._id.toString()
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

export { getAllUsers, userSignup, userLogin };