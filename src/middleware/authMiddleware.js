import jwt from "jsonwebtoken"
import ENVIRONMENT from "../config/environmentConfig.js"
import { ServerError } from "../utils/serverError.js"

const authMiddleware = (request, response, next) => {
    try {
        const authHeader = request.headers.authorization
        if (!authHeader) {
            throw new ServerError(401, 'No hay header de autorizacion')
        }
        const authLoginToken = authHeader.split(' ').pop()
        if (!authLoginToken) {
            throw new ServerError(401, 'No hay token de autorizacion')
        }
        const dataUser = jwt.verify(authLoginToken, ENVIRONMENT.JWT_SECRET_KEY)
        request.user = dataUser
        next()
    }
    catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return response.status(401).json(
                {
                    ok: false,
                    status: 401,
                    message: 'Token invalido'
                }
            )
        }
        else if (error instanceof jwt.TokenExpiredError) {
            return response.status(401).json(
                {
                    ok: false,
                    status: 401,
                    message: 'Token expirado'
                }
            )
        }
        else if (error.status) {
            return response.status(error.status).json(
                {
                    ok: false,
                    status: error.status,
                    message: error.message
                }
            )
        }
        else {
            return response.status(500).json(
                {
                    ok: false,
                    status: 500,
                    message: 'Error interno del servidor'
                }
            )
        }
    }

}

export default authMiddleware