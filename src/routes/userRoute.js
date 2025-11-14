import express from "express"
import userController from "../controllers/userController.js"
import authMiddleware from "../middleware/authMiddleware.js"
const userRouter = express.Router()

userRouter.get('/profile', authMiddleware, userController.getUserProfile)
userRouter.patch('/profile', authMiddleware, userController.updateMyProfile) 
userRouter.delete('/account', authMiddleware, userController.deleteUser)
userRouter.get('/:userId', userController.getUserById)

export default userRouter