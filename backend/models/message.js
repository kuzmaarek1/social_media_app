import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    chatId: { type: String },
    senderId: { type: String },
    text: { type: String },
}, { timestamps: true, });

var MessageModel = mongoose.model("Message", messageSchema);
export default MessageModel;