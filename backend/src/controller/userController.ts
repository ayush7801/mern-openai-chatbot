import { Request, Response, NextFunction } from "express";
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

export { getAllUsers };