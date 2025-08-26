import express from 'express'
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js'
import { getUser, updateUser, deleteUser} from '../controllers/userController.js'
import { body } from "express-validator"

const userRouter = express.Router()

userRouter.get('/:id', authMiddleware, getUser)
userRouter.put('/:id', authMiddleware,
    [
    body("email").optional().isEmail().withMessage("Email invalide"),
    body("first_name").optional().trim().escape(),
    body("last_name").optional().trim().escape(),
    body("bio").optional().trim().escape()
  ], updateUser)
userRouter.delete('/:id', authMiddleware, adminMiddleware, deleteUser)

export default userRouter