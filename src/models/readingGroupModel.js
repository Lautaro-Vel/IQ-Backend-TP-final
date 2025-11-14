import mongoose from "mongoose";

const readingGroupSchema = new mongoose.Schema(
    {
        groupName: {
            type: String,
            require: true
        },
        description: {
            type: String,
            require: true
        },
        created_at: {
            type: Date,
            default: Date.now
        },
        active: {
            type: Boolean,
            default: true
        }
    }
)

const ReadingGroups = mongoose.model("ReadingGroup", readingGroupSchema)

export default ReadingGroups