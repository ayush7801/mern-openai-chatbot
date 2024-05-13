import { Request, Response, NextFunction } from "express";
import User from "../models/userModels.js";
import { model } from '../config/geminiaiConfig.js';

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
        const chats = user.chats;
    
        user.chats.push({role: 'user', parts: [{ text: message }]});
        
        // send chat to openapi server
        // const config = openaiConfig();
        // const openai = new OpenAIApi(config);
        // const chatResponse = await openai.createChatCompletion({
        //     model: Constants.OPENAI_API_MODEL,
        //     messages: chats
        // });

        // ...

        const chatInstance = await model.generateContent(message);
        // {
        //     history: chats,
        //     generationConfig: {
        //         maxOutputTokens: 100,
        //     },
        // }

        // const newChatMessage = await chatInstance.sendMessage(message);
        const aiResponse = await chatInstance.response;
        user.chats.push({ role: 'model', parts: [{ text: aiResponse.text() }] });
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

function geminiaiConfig() {
    throw new Error("Function not implemented.");
}
