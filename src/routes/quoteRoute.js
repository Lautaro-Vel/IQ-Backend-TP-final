import express from "express"
import quoteController from "../controllers/quoteController.js"

const quoteRouter = express.Router()

quoteRouter.get('/home-quotes', quoteController.getAllQuote)
quoteRouter.get('/my-quotes', quoteController.getUserQuotes)
quoteRouter.post('/home-quotes', quoteController.postQuote)
quoteRouter.delete('/my-quotes/:quoteID', quoteController.deleteQuote)

export default quoteRouter