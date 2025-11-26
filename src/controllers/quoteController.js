import quoteRepository from "../repositories/quoteRepository.js";
import { checkID } from "../utils/checkID.js";
import { ServerError } from "../utils/serverError.js";

class quoteController {
    static async getAllQuote (req, res) {
        try {
            const quotes = await quoteRepository.getAll()
            if(quotes.length === 0) {
                throw new ServerError(200, "no hay citas por el momento, agrega una!")
            }
            res.json(
                {
                    ok: true,
                    status: 200,
                    message: "Citas cargadas con éxito",
                    data: {
                        quotes: quotes
                    }
                }
            )
        }
        catch(Error) {
            if(Error.status){                
                return res.status(Error.status).json(
                    {
                        ok: false,
                        status: Error.status,
                        message: Error.message

                    }
                )
            } else {
                return res.status(500).json(
                    {
                        ok: false,
                        status: 500,
                        message: 'Error interno del servidor'
                    }
                )
            }
        }
    }
    static async getUserQuotes (req, res) {
        try {
            const userID = req.user.id
            const userQuotes = await quoteRepository.getQuoteByUserID(userID)
            if(userQuotes.length === 0){
                throw new ServerError(204, "no tienes citas aun, publica una.")
            }
            res.json(
                {
                    ok:true,
                    status: 200,
                    message: "tus citas se cargaron con exito.",
                    data: {
                        userQuotes: userQuotes
                    }
                }
            )
        }
        catch (error){
            if(error.status){
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
                        ok: false,
                        status: 500,
                        message: "error interno del servidor."
                    }
                )
            }
        }
    }
    static async postQuote (req, res) {
        try {
            const userID = req.user.id
            const name = req.user.name
            const author = req.body.author
            const quote = req.body.quote
            if(author.length > 30) {
                throw new ServerError(400, "lo siento, el nombre de tu autor es demasiado largo (maximo 30 caracteres)")
            } else if(!quote) {
                throw new ServerError(400, "debes ingresar una cita")
            } else if(quote.length < 10 || quote.length > 400) {
                throw new ServerError(400, "tu cita debe tener entre 10 y 400 caracteres.")
            }
            const quoteCreated = await quoteRepository.createQuote(userID, name, author, quote)
            res.json(
                {
                    ok: true,
                    status: 200,
                    message: "cita cargada con exito",
                    data : {
                        newQuote: quoteCreated
                    }
                }
            )
        }
        catch(error){
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
                        ok: false,
                        status: 500,
                        message: "error interno del servidor"
                    }
                )
            }
        }
    }
    static async deleteQuote(req, res) {
        try {
            const userID = req.user.id
            const {quoteID} = req.params
            if(!checkID(quoteID)){
                throw new ServerError(400, "el ID recibido por parametro no es un ID valido")
            } 
            const quoteToDelete = await quoteRepository.getOneQuote(quoteID)
            if (!quoteToDelete) {
                throw new ServerError(404, "Cita no encontrada")
            } else if (quoteToDelete.user.toString() !== userID) {
                throw new ServerError(403, "No puedes eliminar esta cita")
            }
            await quoteRepository.deleteQuote(quoteID)
            res.json(
                {
                    ok: true,
                    status: 200,
                    message: "Cita eliminada con éxito"
                }
            )
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
                        ok: false,
                        status: 500,
                        message: "error interno del servidor."
                    }
                )
            }
        } 
    }
}

export default quoteController