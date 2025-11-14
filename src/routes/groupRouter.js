import express from "express"
import groupController from "../controllers/groupController.js"
import authMiddleware from "../middleware/authMiddleware.js"
import membershipMiddleware from "../middleware/membershipMiddleware.js"
import messageController from "../controllers/messageController.js"

const groupRouter = express.Router()

groupRouter.get('/all', groupController.getAllGroups)
groupRouter.get('/my/groups', authMiddleware, groupController.getMyGroups)
groupRouter.get('/:groupId', groupController.getGroupById)
groupRouter.get("/:groupId/messages", authMiddleware, membershipMiddleware, messageController.getMessages)
groupRouter.post("/:groupId/messages", authMiddleware, membershipMiddleware, messageController.sendMessage)
groupRouter.delete("/:groupId/messages/:messageId", authMiddleware, membershipMiddleware, messageController.deleteMessage)
groupRouter.post('/create', authMiddleware, groupController.createGroup)
groupRouter.post('/join/:groupId', authMiddleware, groupController.joinGroup)
groupRouter.delete('/leave/:groupId', authMiddleware, membershipMiddleware, groupController.leaveGroup)

export default groupRouter