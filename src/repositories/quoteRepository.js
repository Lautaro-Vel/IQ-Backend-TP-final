import Quotes from "../models/quoteModel.js";

class quoteRepository {
    static async createQuote (userID, name, author, quote) {
        const newQuote = await Quotes.create({
            user: userID,
            userName: name,
            author: author,
            quote: quote
        })
        return newQuote
    }
    static async getAll() {
        const getAllQuotes = await Quotes.find().populate('user');
        return getAllQuotes;
    }
    static async getOneQuote(idQuote) {
        const oneQuoteFind = await Quotes.findById(idQuote)
        return oneQuoteFind
    }
    static async getQuoteByUserID(userID){
        const quoteByUser = await Quotes.find({user: userID})
        return quoteByUser
    }
    static async deleteQuote (idQuote) {
        await Quotes.findByIdAndDelete(idQuote)
        return true
    }   
    static async updateQuote (idQuote, newValuesQuote) {
        const updatedQuote = await Quotes.findByIdAndUpdate(
            idQuote,
            newValuesQuote, 
            {
                new: true
            }
        )
        return updatedQuote
    }
}

export default quoteRepository