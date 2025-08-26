import express from 'express'
import { authMiddleware, adminMiddleware } from '../middleware/authMiddleware.js'
import { getAllAlumni } from '../controllers/alumniController.js'

const alumniRouter = express.Router()

alumniRouter.get('/all', authMiddleware, getAllAlumni)

export default alumniRouter