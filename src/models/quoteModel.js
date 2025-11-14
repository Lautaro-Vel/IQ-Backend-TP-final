import mongoose from "mongoose"

const quoteSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required:true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            reference: "User",
            required: true
        }, 
        author: {
            type: String,
            default: "autor anonimo/desconocido"
        },
        quote: {
            type: String,
            required: true
        },
        created: {
            type: Date,
            default: Date.now
        }
    }
)

const Quotes = mongoose.model("Quote", quoteSchema)

export default Quotes