import Formation from "../models/formation.js"

// CREATE
export const createFormation = async (req, res) => {

  const { title, description, level } = req.body
  const userId = req.user?.id

  if (!userId) return res.status(401).json("Utilisateur non authentifié")

  try {

    const newFormation = new Formation({
      title,
      description,
      level,
      createdBy: userId
    })

    await newFormation.save()
    res.status(201).json(newFormation)
  } catch (err) {
    console.error("Erreur lors de la création :", err);
    res.status(500).json("Erreur lors de la création de la formation")
  }
}

// READ ALL
export const getFormations = async (req, res) => {
  try {
    const formations = await Formation.find().populate("createdBy", "first_name")
    res.status(200).json(formations)
  } catch (err) {
    res.status(500).json("Erreur lors de la récupération des formations")
  }
}

// UPDATE
export const updateFormation = async (req, res) => {
  const { id } = req.params
  const userId = req.user.id

  try {
    const formation = await Formation.findById(id)
    if (!formation) return res.status(404).json("Formation non trouvée")
    if (formation.createdBy.toString() !== userId) {
      return res.status(403).json("Non autorisé à modifier cette formation")
    }

    const updated = await Formation.findByIdAndUpdate(id, req.body, { new: true })
    res.status(200).json(updated)
  } catch (err) {
    res.status(500).json("Erreur lors de la mise à jour")
  }
}

// DELETE
export const deleteFormation = async (req, res) => {
  const { id } = req.params
  const userId = req.user.id

  try {
    const formation = await Formation.findById(id)
    if (!formation) return res.status(404).json("Formation non trouvée")
    if (formation.createdBy.toString() !== userId) {
      return res.status(403).json("Non autorisé à supprimer cette formation")
    }

    await formation.deleteOne()
    res.status(200).json("Formation supprimée")
  } catch (err) {
    res.status(500).json("Erreur lors de la suppression")
  }
}