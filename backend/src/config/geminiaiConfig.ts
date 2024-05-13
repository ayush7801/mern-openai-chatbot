import { GoogleGenerativeAI } from "@google/generative-ai";

class GeminiAIConfig {
    public static readonly GEMINI_MODEL = "gemini-pro";
    model = null;
    getGeminiModel() {
        if (!this.model) {
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
            this.model = genAI.getGenerativeModel({ model: GeminiAIConfig.GEMINI_MODEL });
        }
        return this.model;
    }
}

export default new GeminiAIConfig();
