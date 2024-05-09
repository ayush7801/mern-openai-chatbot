import exp from 'constants';
import express from 'express';
import { ContextRunner, body, validationResult } from "express-validator";

export const validateRequest = (validations: ContextRunner[]) => {    
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        for(let validation of validations) {
            const result = await validation.run(req);
            // if (!result.isEmpty()) break;
        }
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
    
        return res.status(422).json({
            message: "Request body validation failed",
            errors: errors.array()
        });
    }
};

export const signUpValidatorList = [
    body("name").trim().isLength({ min: 3 }).withMessage("Name must be at least 3 characters long"),
    body("email").trim().isEmail().withMessage("Invalid email address"),
    body("password").isLength({ min: 5 }).withMessage("Password must be at least 5 characters long")
];

export const logInValidatorList = [
    body('email').isEmail().withMessage('Invalid email address')
]

export const chatReqValidatorList = [
    body('message').trim().isString().isLength({ min: 1 }).withMessage('Invalid message')
]
