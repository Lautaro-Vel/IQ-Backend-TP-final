import dotenv from "dotenv"

dotenv.config()
const ENVIRONMENT = {
    URL_MONGODB : process.env.MONGO_DB_CONNECTION_STRING,
    JWT_SECRET_KEY : process.env.JWT_SECRET_KEY,
    GMAIL_NAME : process.env.GMAIL_NAME,
    GMAIL_PASSWORD_KEY : process.env.GMAIL_PASSWORD_KEY,
    FRONTEND_URL : process.env.FRONTEND_URL
}

export default ENVIRONMENT