import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true, 
        },
        userSurname: {
            type: String,
            default: ""
        },
        mail: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        checkMail: {
            type: Boolean,
            default: false,
            required: true
        },
        age: {
            type: String,
            default: "inmortal"
        },
        profession: {
            type: String,
            default: "secreta"
        },
        nationality: {
            type: String,
            default: "de algún lugar del mundo"
        }
    }
)

const Users = mongoose.model("User", userSchema)

export default Users