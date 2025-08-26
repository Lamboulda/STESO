import express from 'express'
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js'
import { getAdminActions } from '../controllers/adminActionsController.js'

const adminActionsRouter = express.Router()

adminActionsRouter.get('/', authMiddleware, adminMiddleware, getAdminActions)

export default adminActionsRouter