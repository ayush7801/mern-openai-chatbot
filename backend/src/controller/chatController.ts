import { Request, Response, NextFunction } from "express";
import { ChatCompletionRequestMessage, OpenAIApi } from "openai";
import User from "../models/userModels.js";
import { openaiConfig } from "../config/openaiConfig.js";
import { Constants } from "../constants/constants.js";

const generateChatCompletion = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Chat completion logic
        const { message } = req.body;
        const user = await User.findById(res.locals.jwtdata.id);
        if(!user)
            return res.status(401).json({
                status: 'fail',
                message: 'Token is valid but user not found'
            });
        // get chats of user
        const chats = user.chats as ChatCompletionRequestMessage[];
        chats.push({role: 'user', content: message});
        user.chats.push({role: 'user', content: message});
        // send chat to openapi server
        const config = openaiConfig();
        const openai = new OpenAIApi(config);
        const chatResponse = await openai.createChatCompletion({
            model: Constants.OPENAI_API_MODEL,
            messages: chats
        });
        // get ai response
        const aiResponse = chatResponse.data.choices[0].message;
        user.chats.push(aiResponse);
        await user.save();
        return res.status(200).json({
            status: 'success',
            chats: user.chats
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
}

export { generateChatCompletion };