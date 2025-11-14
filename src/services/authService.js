import ENVIRONMENT from "../config/environmentConfig.js";
import transporter from "../config/mailsConfig.js";
import usersRepository from "../repositories/userRepository.js";
import { ServerError } from "../utils/serverError.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

class authService {
    static async register (username, gmail, password) {
        const existsUser = await usersRepository.getByMail(gmail)
        if (existsUser) {
            throw new ServerError(400, "el gmail ya esta registrado.")
        }
        const hashPassword = await bcrypt.hash(password, 12)
        const createUser = await usersRepository.createUser(username, gmail, hashPassword)
        const authRegisterToken = jwt.sign(
            {
                gmail: gmail,
                userID: createUser._id
            },
            ENVIRONMENT.JWT_SECRET_KEY,
            {
                expiresIn: '3d'
            }
        )
        await transporter.sendMail({
            from: ENVIRONMENT.GMAIL_NAME,
            to: gmail,
            subject: 'Verificación de correo - Iconic Quotes',
            html: `
            <div style="font-family: Arial, sans-serif; background-color: #061216; color: #eff6e0; padding: 20px;">
                <div style="background-color: #001720; padding: 30px; border-radius: 15px; max-width: 500px; margin: 0 auto;">
                    <h1 style="color: #aec3b0; text-align: center;">Verificar Email</h1>
                    <p>Hola ${username},</p>
                    <p>Haz clic para verificar tu cuenta:</p>
                    <div style="text-align: center; margin: 20px 0;">
                        <a href="http://localhost:8080/api/auth/check-mail/${authRegisterToken}" 
                           style="background-color: #598392; color: #eff6e0; padding: 12px 25px; text-decoration: none; border-radius: 8px;">
                           Verificar
                        </a>
                    </div>
                    <p style="font-size: 14px; color: #598392;">Este enlace expira en 3 días.</p>
                </div>
            </div>
            `
        })
    }
    static async checkMail (authRegisterToken) {
        try{
            const dataToken = jwt.verify(authRegisterToken, ENVIRONMENT.JWT_SECRET_KEY)
             await usersRepository.updateUser(
                dataToken.userID,
                {
                    checkMail: true
                }
            )
            return
        }
        catch(error) {
            if(error instanceof jwt.JsonWebTokenError) {
                throw new ServerError(400, "token incorrecto")
            } else if(error instanceof jwt.TokenExpiredError) {
                throw new ServerError(400, "Token expirado: tiempo de verificacion expirado.")
            }
        }

    }
    static async login (gmail, password) {
        const userFound = await usersRepository.getByMail(gmail)
        if(!userFound) {
            throw new ServerError(404, "mail no registrado.")
        }
        if (userFound.checkMail === false) {
            throw new ServerError(400, "Mail no verificado")
        }
        const checkPassword = await bcrypt.compare(password, userFound.password)
        if(!checkPassword) {
            throw new ServerError(401, "contraseña incorrecta.")
        }
        const authLoginToken = jwt.sign(
            {
                id: userFound._id,
                mail: userFound.mail,
                name: userFound.userName,
                age: userFound.age,
                nationality: userFound.nationality,
                surname: userFound.userSurname,
                profession: userFound.profession
            },
            ENVIRONMENT.JWT_SECRET_KEY
        )
        return authLoginToken
    }
}

export default authService