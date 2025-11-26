import MessageGroups from "../models/messageGroupModel.js";

class messageRepository {
    static async createMessage (userID, groupID, userName, message) {
        const newMessage = await MessageGroups.create({
            user: userID,
            group: groupID,
            userName: userName,
            message: message
        })
        return newMessage
    }
    static async getMessagesByGroup(groupID) {
        const messages = await MessageGroups.find({group: groupID})
        return messages
    }
    static async getOneMessage(messageID) {
        const oneMessage = await MessageGroups.findById(messageID)
        return oneMessage
    }
    static async deleteMessage (messageID) {
        await MessageGroups.findByIdAndDelete(messageID)
        return true
    }
}

export default messageRepository