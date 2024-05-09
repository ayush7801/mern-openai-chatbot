import { Request, Response, NextFunction } from "express";

const generateChatCompletion = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Chat completion logic
        const { message } = req.body;
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
}

export { generateChatCompletion };