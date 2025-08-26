import db from '../database/db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const { User, Admin } = db
const JWT_SECRET = process.env.JWT_SECRET

export const createUser = async (req, res) => {
    const {first_name, last_name, email, password} = req.body

    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json("Tous les champs sont requis.")
    }
    try{
        // We search in our DB where the email could match the req.body.email (the email given by the user)
        const normalizedEmail = email.trim().toLowerCase()

        const emailVerification = await User.findOne({ where: { email: normalizedEmail } })

        if (emailVerification) {
            return res.status(409).json("Email déjà utilisé")
        }
        const saltPassword = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, saltPassword)

        const newUser = await User.create({
            first_name,
            last_name,
            email: normalizedEmail,
            password : hashedPassword,
        })

        return res.status(201).json(`Bienvenue ${newUser.first_name}`)
    }
    catch(err){
        console.log(err)
        return res.status(500).json(`Internal server error`, err)
    }
}

export const loginUser = async (req, res) => {

    const {email, password} = req.body

    if (!email || !password) {
        return res.status(400).json("Email et mot de passe sont requis.")
    }
    try{
        const normalizedEmail = email.trim().toLowerCase()
        const user = await User.findOne({ where: { email: normalizedEmail } })

        if(!user){
            return res.status(404).json(`Email ou mot de passe invalide`)
        }

        const comparePassword = await bcrypt.compare(password, user.password)
        if(!comparePassword){
            return res.status(404).json(`Email ou mot de passe invalide`)
        }

        const token = jwt.sign(
        {
            id: user.id,
            first_name: user.first_name,
        },
        JWT_SECRET,
        { expiresIn: "2h" }
        )

        const admin = await Admin.findOne({ where: { user_id: user.id } })

        return res.status(200).json({
            message: `Bienvenue ${user.first_name}`,
            token,
            user: {
                id: user.id,
                first_name: user.first_name,
                isAdmin: !!admin,
            }})
    }
    catch(err){
        console.log(err)
        return res.status(500).json(`Internal server error`, err)
    }
}