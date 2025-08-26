import db from '../database/db.js'

const { Formation, User } = db

// CREATE
export const createFormation = async (req, res) => {
  const { title, description, level } = req.body
  const userId = req.user?.id

  if (!userId) return res.status(401).json("Utilisateur non authentifié")

  try {
    const newFormation = await Formation.create({
      title,
      description,
      level,
      users_id: userId,
    })

    res.status(201).json(newFormation)
  } catch (err) {
    console.error("Erreur lors de la création :", err)
    res.status(500).json("Erreur lors de la création de la formation")
  }
}

// READ ALL
export const getFormations = async (req, res) => {
  try {
    const formations = await Formation.findAll({
      include: {
        model: User,
        as: 'creator',
        attributes: ['first_name', 'last_name'],
      },
    })
    res.status(200).json(formations)
  } catch (err) {
    console.error(err)
    res.status(500).json("Erreur lors de la récupération des formations")
  }
}

// UPDATE
export const updateFormation = async (req, res) => {
  const { id } = req.params
  const userId = req.user?.id

  if (!userId) return res.status(401).json("Utilisateur non authentifié")

  try {
    const formation = await Formation.findByPk(id)
    if (!formation) return res.status(404).json("Formation non trouvée")

    if (formation.createdBy !== userId && !req.admin) {
      return res.status(403).json("Non autorisé à modifier cette formation")
    }

    const updatedFormation = await formation.update(req.body)
    res.status(200).json(updatedFormation)
  } catch (err) {
    console.error("Erreur lors de la mise à jour :", err)
    res.status(500).json({ message: err.message || "Erreur lors de la mise à jour" })
  }
}

// DELETE
export const deleteFormation = async (req, res) => {
  const { id } = req.params
  const userId = req.user?.id

  if (!userId) return res.status(401).json("Utilisateur non authentifié")

  try {
    const formation = await Formation.findByPk(id)
    if (!formation) return res.status(404).json("Formation non trouvée")

    if (formation.createdBy !== userId && !req.admin) {
      return res.status(403).json("Non autorisé à supprimer cette formation")
    }

    await formation.destroy()
    res.status(200).json("Formation supprimée")
  } catch (err) {
    console.error(err)
    res.status(500).json("Erreur lors de la suppression")
  }
}