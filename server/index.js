import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './database/testConnection.js'
import authRouter from './routes/authRouter.js'
import formationRouter from './routes/formationRouter.js'
import userRouter from './routes/userRouter.js'
import contactRouter from './routes/contactRouter.js'
import alumniRouter from './routes/alumniRouter.js'

const app = express()
const PORT = process.env.PORT

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/auth',authRouter)
app.use('/formations', formationRouter)
app.use("/users", userRouter)
app.use('/alumni', alumniRouter)
app.use('/contact', contactRouter)

app.get('/', (req, res) => {
  res.send('Bienvenue')
})

connectDB()

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})