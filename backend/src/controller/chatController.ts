import { Request, Response, NextFunction, json, text } from "express";
import User from "../models/userModels.js";
import geminiConfigObject from '../config/geminiaiConfig.js';

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
        const filterdChats = chats.map(chat => {
            return {
                role: chat.role,
                parts: chat.parts.map(part => {
                    return { text: part.text };
                })
            };
        });
        // send chat to openapi server
        // const config = openaiConfig();
        // const openai = new OpenAIApi(config);
        // const chatResponse = await openai.createChatCompletion({
        //     model: Constants.OPENAI_API_MODEL,
        //     messages: chats
        // });

        // ...
        console.log("chats", ...filterdChats);
        const chatInstance = await geminiConfigObject.getGeminiModel().startChat({
            history: filterdChats,
            generationConfig: {
                maxOutputTokens: 100,
            },
        });

        const newChatMessage = await chatInstance.sendMessage(message);
        const aiResponse = await newChatMessage.response;
        console.log("aiResponse", aiResponse.text());
        user.chats.push({ role: 'model', parts: [{ text: aiResponse.text() || "It's out of my limits, is their any other way i can help you."}] });
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