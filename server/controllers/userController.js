import User from "../models/user.js"
import mongoose from 'mongoose'

// GET - Infos du profil
export const getUser = async (req, res) => {
  const { id } = req.params

  // On empêche un utilisateur de consulter un autre profil
  if (req.user.id !== id && req.user.role !== "admin") {
    return res.status(403).json("Accès refusé")
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json("ID invalide")
  }

  try {
    const user = await User.findById(id).select("-password -role")
    if (!user) return res.status(404).json("Utilisateur non trouvé")
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json("Erreur serveur")
  }
}

// PUT - Modifier son profil
export const updateUser = async (req, res) => {
  const { id } = req.params
  const errors = validationResult(req)

  if (req.user.id !== id && req.user.role !== "admin") {
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
    const { role, ...safeData } = req.body;
    const updated = await User.findByIdAndUpdate(id, safeData,
      { new: true,
        runValidators: true,
      }).select("-password")

    res.status(200).json(updated)
  } catch (err) {
    res.status(500).json("Erreur lors de la mise à jour du profil")
  }
}

// DELETE - Supprimer un utilisateur (admin seulement)
export const deleteUser = async (req, res) => {
  const { id } = req.params

  try {
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json("Utilisateur non trouvé")
    res.status(200).json("Utilisateur supprimé avec succès")
  } catch (err) {
    res.status(500).json("Erreur lors de la suppression du profil")
  }
}

// GET - Tous les utilisateurs sauf les admins
export const getAllNonAdminUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: 'admin' } }).select("first_name last_name email bio _id")
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json("Erreur lors de la récupération des utilisateurs")
  }
}
