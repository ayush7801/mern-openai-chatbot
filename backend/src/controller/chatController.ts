import { Request, Response, NextFunction } from "express";
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
    
        const chatInstance = await geminiConfigObject.getGeminiModel().startChat({
            history: filterdChats,
            generationConfig: {
                maxOutputTokens: 100,
            },
        });

        const newChatMessage = await chatInstance.sendMessage(message);
        const aiResponse = await newChatMessage.response;
        user.chats.push({ role: 'model', parts: [{ text: aiResponse.text() || "It's out of my limits, is their any other way i can help you?"}] });
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

const getChatHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get chat history logic
        const userId = res.locals.jwtdata.id;
        const user = await User.findById(userId)
        if(!user)
            return res.status(401).json({
                status: 'fail',
                message: 'Token is valid but user not found'
            });
        const chats = user.chats;
        res.status(200).json({
            status: 'success',
            chats: chats
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
}

const clearChat = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = res.locals.jwtdata.id;
        const user = await User.findById(userId);
        if(!user)
            return res.status(401).json({
                status: 'fail',
                message: 'Token is valid but user not found'
            });
        user.chats.splice(0, user.chats.length);
        await user.save();
        return res.status(200).json({
            status: 'success',
            message: 'Chat cleared successfully',
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

const getSingleResponse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("get Single response")
        const userMessage = req.body.message;
        const aiResponse = await geminiConfigObject.getGeminiModel().generateContent(userMessage);
        const modelMessage = await aiResponse.response.text() || "Hi There, How are you doing today? 👋";
        return res.status(200).json({
            status: 'success',
            message: modelMessage
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
}

export { generateChatCompletion, getChatHistory, clearChat, getSingleResponse };