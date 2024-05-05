import jwt from 'jsonwebtoken';

export const createToken = (payload: Object, expiresIn: string) => {
    return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn });
}