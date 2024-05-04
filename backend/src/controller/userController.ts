import { Request, Response, NextFunction } from "express";
import { hash } from "bcrypt";
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

export { getAllUsers, userSignup };