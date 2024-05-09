import { Configuration } from 'openai';

export const openaiConfig = () => {
    const config = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
        organization: process.env.OPENAI_ORG_ID
    });
}