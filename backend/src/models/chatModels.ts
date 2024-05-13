import mongoose from "mongoose";
import { randomUUID } from "crypto";

let PartsSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    }
});

let chatSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    parts: {
        type: [PartsSchema],
        required: true
    }
});

export default chatSchema;