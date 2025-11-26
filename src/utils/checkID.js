import mongoose from "mongoose"

export function checkID (id){
    return mongoose.isValidObjectId(id)
}
