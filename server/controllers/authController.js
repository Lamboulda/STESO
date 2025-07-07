import User from "../models/user.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export const createUser = async (req, res) => {
    console.log(req.body)
    const {first_name, last_name, email, password} = req.body
    try{
        // We search in our DB where the email could match the req.body.email (the email given by the user)
        const emailVerification = await User.findOne({email: email.trim().toLowerCase()})
        if(emailVerification){
            return res.status(409).json(`Email déjà utilisé`)
        }
        const saltPassword = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, saltPassword)

        console.log(req.file)

        const newUser = new User({
            first_name,
            last_name,
            email: email.trim().toLowerCase(),
            password : hashedPassword,
            role: "user",
        })

        await newUser.save()
        return res.status(201).json(`Bienvenue ${first_name}`)
    }
    catch(err){
        console.log(err)
        return res.status(500).json(`Internal server error`, err)
    }
}

export const loginUser = async (req, res) => {

    const {email, password} = req.body
    try{

        const user = await User.findOne({email: email.trim().toLowerCase()})

        if(!user){
            return res.status(404).json(`Email ou mot de passe invalide`)
        }

        const comparePassword = await bcrypt.compare(password, user.password)
        if(!comparePassword){
            return res.status(404).json(`Email ou mot de passe invalide`)
        }

        const token = jwt.sign(
        {
            id: user._id,
            role: user.role,
            first_name: user.first_name,
        },
        JWT_SECRET,
        { expiresIn: "2h" }
        )
        return res.status(200).json({
            message: `Bienvenue ${user.first_name}`,
            token,
            user: {
                id: user._id,
                first_name: user.first_name,
                role: user.role
            }})
    }
    catch(err){
        console.log(err)
        return res.status(500).json(`Internal server error`, err)
    }
}