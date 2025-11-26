import mongoose from "mongoose"
import ENVIRONMENT from "./environmentConfig.js"

async function connectMongoDB() {
    try{
        await mongoose.connect(ENVIRONMENT.URL_MONGODB, {
            timeoutMS: 60000,
            socketTimeoutMS: 60000
        })
    }
    catch(error){
        console.error('La conexion con MongoDB fallo')
    }
}

export default connectMongoDB