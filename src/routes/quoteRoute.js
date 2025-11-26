import express from "express"
import quoteController from "../controllers/quoteController.js"
import authMiddleware from "../middleware/authMiddleware.js"

const quoteRouter = express.Router()

quoteRouter.get('/home-quotes', authMiddleware, quoteController.getAllQuote)
quoteRouter.get('/my-quotes', authMiddleware, quoteController.getUserQuotes)
quoteRouter.post('/home-quotes', authMiddleware, quoteController.postQuote)
quoteRouter.delete('/my-quotes/:quoteID', authMiddleware, quoteController.deleteQuote)

export default quoteRouter