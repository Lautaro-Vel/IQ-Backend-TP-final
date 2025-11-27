import mongoose from "mongoose";

const memberGroupSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        group: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ReadingGroup",
            required: true
        },
        role: {
            type: String,
            enum: ["super reader", "reader"],
            default: "reader"
        },
        unitedAt: {
            type: Date,
            default: Date.now
        }
    }
)

const MemberGroups = mongoose.model("MemberGroup", memberGroupSchema)

export default MemberGroups