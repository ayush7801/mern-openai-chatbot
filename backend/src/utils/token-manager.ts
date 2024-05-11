import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Constants } from '../constants/constants.js';

export const createToken = (payload: Object, expiresIn: string) => {
    return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn });
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.signedCookies[Constants.AUTH_COOKIE_NAME];
    if (!token || token.trim() === '') {
        return res.status(401).json({ message: 'Invalid Token' });
    }
    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        res.locals.jwtUser = decoded;
        return next();
    });
}