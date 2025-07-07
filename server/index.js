import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './database/db.js'
import authRouter from './routes/authRouter.js'
import formationRouter from './routes/formationRouter.js'
import userRouter from './routes/userRouter.js'
import contactRouter from './routes/contactRouter.js'

const app = express()
const PORT = process.env.PORT

app.use(cors({
  origin: 'https://steso.vercel.app',
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/auth',authRouter)
app.use('/formations', formationRouter)
app.use("/users", userRouter)
app.use('/contact', contactRouter)

app.get('/', (req, res) => {
  res.send('Bienvenue')
})

connectDB()

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})