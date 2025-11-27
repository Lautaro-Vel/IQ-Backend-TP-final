import ENVIRONMENT from "../config/environmentConfig.js";
import usersRepository from "../repositories/userRepository.js";
import authService from "../services/authService.js";
import { ServerError } from "../utils/serverError.js";
import jwt from "jsonwebtoken";

class authController {
    static async register(req, res) {
        try{
            const {name, gmail, password} = req.body
            if(!name) {
                throw new ServerError(400, "nombre de usuario mal ingresado o de sintaxis incorrecta")
            } else if(!gmail || !String(gmail).toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
                throw new ServerError(400, "mail mal ingresado o de sintaxis incorrecta")
            } else if(!password || password.length < 8) {
                throw new ServerError(400, "contraseña mal ingresada o de sintaxis incorrecta")
            }
            await authService.register(name, gmail, password)
            res.json(
                {
                    ok:true,
                    status:200,
                    message:"usuario registrado correctamente"
                }
            )
        }
        catch(error) {
            if (error.status){
                return res.json(
                    {
                        ok: false,
                        status: error.status,
                        message: error.message
                    }
                )
            } else {
                return res.json(
                    {
                        ok:false,
                        status: 500,
                        message:"error interno del servidor."
                    }
                )
            }
        }
    }
    static async checkMail (req, res) {
        try {
            const {authRegisterToken} = req.params
            await authService.checkMail(authRegisterToken)
            res.json({
                ok: true,
                status: 200,
                message: "Email verificado correctamente"
            })    
        }
        catch(error) {
            if(error.status) {
                return res.json(
                    {
                        ok: false,
                        status: error.status,
                        message: error.message
                    }
                )
            } else {
                return res.json(
                    {
                        ok:false,
                        status: 500,
                        message:"error interno del servidor."
                    }
                )
            }
        }
    }
    static async login (req, res) {
        try {
            const {gmail, password} = req.body
            if (!gmail) {
                throw new ServerError(400, "debes ingresar tu Mail.")
            } else if (!password) {
                throw new ServerError(400, "debes ingresar tu contraseña.")
            }
            const authLoginToken = await authService.login(gmail, password)
            const userData = jwt.decode(authLoginToken)
            res.json(
                {
                    ok:true,
                    status:200,
                    message:"usuario logueado correctamente",
                    data: {
                        token: authLoginToken,
                        user: {
                            id: userData.id,
                            gmail: userData.gmail,
                            name: userData.name,
                            age: userData.age,
                            nationality: userData.nationality,
                            surname: userData.surname,
                            profession: userData.profession
                        }
                    }
                }
            )    
        }
        catch(error){
            if(error.status) {
                return res.json(
                    {
                        ok:false,
                        status: error.status,
                        message: error.message
                    }
                )
            } else {
                return res.json(
                    {
                        ok: false, 
                        status: 500,
                        message: "error interno del servidor."
                    }
                )
            }
        }
    }
}

export default authController