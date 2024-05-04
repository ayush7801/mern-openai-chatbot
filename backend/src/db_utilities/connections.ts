import { connect, disconnect } from "mongoose"; 

export const connectToDB = async () => {
    try {
        await connect(process.env.MONGODB_URL as string);
        console.log("Connected to MongoDB...");
    } catch (error) {
        console.log("Error connecting to MongoDB: ", error);
        throw new Error("Error connecting to MongoDB");
    }
}

export const closeDBConnection = async () => {
    try {
        await disconnect();
        console.log("Disconnected from MongoDB...");
    } catch (error) {
        console.log("Error disconnecting from MongoDB: ", error);
        throw new Error("Error disconnecting from MongoDB");
    }
}