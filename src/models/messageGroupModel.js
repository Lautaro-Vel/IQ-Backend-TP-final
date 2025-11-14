import mongoose from "mongoose";

const messageGroupSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            reference: "User",
            required: true
        },
        group: {
            type: mongoose.Schema.Types.ObjectId,
            reference: "ReadingGroup",
            required: true
        },
        userName: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        time: {
            type: Date,
            default: Date.now
        }
    }
)

const MessageGroups = mongoose.model("MessageGroup", messageGroupSchema)

export default MessageGroups
