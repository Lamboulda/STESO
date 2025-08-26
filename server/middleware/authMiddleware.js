import jwt from 'jsonwebtoken'
import db from '../database/db.js'

const JWT_SECRET = process.env.JWT_SECRET

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Missing or malformed token, access denied' })
    }

  const token = authHeader.split(' ')[1]
    try {
    
        const verify = jwt.verify(token, JWT_SECRET)
        req.user = verify
        next()

    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(403).json({ error: "Invalid token : incorrect signature" })
        }
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(403).json({ error: "Token expired, please login again" })
        }
        return res.status(500).json({ error: "Error while verifating the token" })
    }
  }

export const adminMiddleware = async (req, res, next) => {
    try {
    const admin = await db.Admin.findOne({ where: { user_id: req.user.id } })
    if (!admin) {
      return res.status(403).json({ message: "Accès refusé : réservé aux admins" })
    }

    req.admin = admin
    next()
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Erreur lors de la vérification admin" })
  }
}