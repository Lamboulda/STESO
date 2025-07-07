import express from "express"
import {createFormation, getFormations, updateFormation, deleteFormation} from "../controllers/formationController.js"
import { authMiddleware, adminMiddleware } from "../middleware/authMiddleware.js"

const formationRouter = express.Router()

formationRouter.get("/", getFormations)

formationRouter.post("/", authMiddleware, adminMiddleware, createFormation)
formationRouter.put("/:id", authMiddleware, adminMiddleware, updateFormation)
formationRouter.delete("/:id", authMiddleware, adminMiddleware, deleteFormation)

export default formationRouter