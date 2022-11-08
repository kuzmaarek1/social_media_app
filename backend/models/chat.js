import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
    members: { type: Array },
}, { timestamps: true, });

var ChatModel = mongoose.model("Chat", chatSchema);
export default ChatModel;