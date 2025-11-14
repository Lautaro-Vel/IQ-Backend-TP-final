import messageRepository from "../repositories/messageRepository.js"
import {ServerError} from "../utils/serverError.js"

class messageController {
    static async sendMessage(req, res) {
        try {
            const {groupId} = req.params
            const {message} = req.body
            const userID = req.user.id
            const userName = req.user.name
            if(!message || message.lenght === 0){
                throw new ServerError(400, "debes ingresar un mensaje")
            }
            const newMessage = await messageRepository.createMessage(userID, groupId, userName, message)
            res.json(
                {
                    ok: true,
                    status: 200,
                    message: "el mensaje se envio correctamente",
                    data: {
                        newMessage
                    }
                }
            )
        } catch (error) {
            if (error.status) {
                return res.json(
                    {
                        ok: false,
                        status: error.status,
                        message: error.message
                    }
                )
            }
            res.json(
                {
                    ok: false,
                    status: 500,
                    message: "error interno del servidor."
                }
            )
        }
    }
    static async getMessages(req, res) {
        try {
            const {groupId} = req.params
            const messages = await messageRepository.getMessagesByGroup(groupId)
            res.json(
                {
                    ok: true,
                    status: 200,
                    message: "mensajes cargados",
                    data: {
                        messages
                    }
                }
            )
        } catch (error) {
            if (error.status) {
                return res.json(
                    {
                        ok: false,
                        status: error.status,
                        message: error.message
                    }
                )
            }
            res.json(
                {
                    ok: false,
                    status: 500,
                    message: "error interno del servidor"
                }
            )
        }
    }

    static async deleteMessage(req, res) {
        try {
            const {messageId} = req.params
            const userID = req.user.id
            const message = await messageRepository.getOneMessage(messageId)
            if (!message) {
                throw new ServerError(404, "no se encontro el mensaje")
            }
            if (message.user.toString() !== userID) {
                throw new ServerError(403, "no puedes eliminar mensajes de otras personas")
            }
            await messageRepository.deleteMessage(messageId)
            res.json(
                {
                    ok: true,
                    status: 200,
                    message: "mensaje eliminado"
                }
            )
        } catch (error) {
            if (error.status) {
                return res.json(
                    {
                        ok: false,
                        status: error.status,
                        message: error.message
                    }
                )
            }
            res.json(
                {
                    ok: false,
                    status: 500,
                    message: "error interno del servidor"
            })
        }
    }
}

export default messageController