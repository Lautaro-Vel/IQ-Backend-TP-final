import nodemailer from 'nodemailer'
import ENVIRONMENT from './environmentConfig.js'

const transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth: {
            user: ENVIRONMENT.GMAIL_NAME,
            pass: ENVIRONMENT.GMAIL_PASSWORD_KEY
        }
    }
)

export default transporter