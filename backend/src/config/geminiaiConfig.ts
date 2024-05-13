import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_MODEL = "gemini-pro"

export const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });