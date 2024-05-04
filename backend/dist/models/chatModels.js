import mongoose from "mongoose";
import { randomUUID } from "crypto";
let chatSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        default: randomUUID()
    },
    role: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});
export default chatSchema;
//# sourceMappingURL=chatModels.js.map