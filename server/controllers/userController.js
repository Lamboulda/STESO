import db from '../database/db.js'
import { validationResult } from 'express-validator'

const { User, Admin } = db

// GET - Infos du profil
export const getUser = async (req, res) => {
  const { id } = req.params

  // On empêche un utilisateur de consulter un autre profil sauf si adminMiddleware a ajouté req.admin
  if (parseInt(req.user.id) !== parseInt(id) && !req.admin) {
    return res.status(403).json("Accès refusé")
  }

  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    })
    if (!user) return res.status(404).json("Utilisateur non trouvé")

    res.status(200).json(user)
  } catch (err) {
    console.error(err)
    res.status(500).json("Erreur serveur")
  }
}

// PUT - Modifier son profil
export const updateUser = async (req, res) => {
  const { id } = req.params
  const errors = validationResult(req)

  if (parseInt(req.user.id) !== parseInt(id) && !req.admin) {
    return res.status(403).json("Accès refusé")
  }

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const allowedFields = ['first_name', 'last_name', 'email', 'bio']
  const safeData = {}

  allowedFields.forEach(field => {
    if (req.body[field] !== undefined) {
      safeData[field] = req.body[field]
    }
  })

  try {
    const user = await User.findByPk(id)
    if (!user) return res.status(404).json("Utilisateur non trouvé")

    await user.update(safeData)

    const updatedUser = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    })

    res.status(200).json(updatedUser)
  } catch (err) {
    console.error(err)
    res.status(500).json("Erreur lors de la mise à jour du profil")
  }
}

// DELETE - Supprimer un utilisateur (admin seulement)
export const deleteUser = async (req, res) => {
  const { id } = req.params

  if (!req.admin) {
    return res.status(403).json("Accès refusé : réservé aux admins")
  }

  try {
    const user = await User.findByPk(id)
    if (!user) return res.status(404).json("Utilisateur non trouvé")

    await user.destroy()

    res.status(200).json("Utilisateur supprimé avec succès")
  } catch (err) {
    console.error(err)
    res.status(500).json("Erreur lors de la suppression du profil")
  }
}