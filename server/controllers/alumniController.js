import db from "../database/db.js"

const { User, Alumni, Admin } = db

export const getAllAlumni = async (req, res) => {
  try {
    const alumniList = await User.findAll({
      include: [{
          model: Alumni,
          as: 'alumni',
          attributes: ['graduation_year', 'profession'],
          required: false,
        },
        {
          model: Admin,
          as: 'admin',
          required: false,
        }
      ],
      where: {
        '$Admin.user_id$': null // Exclut les admins
      },
      attributes: ['id', 'first_name', 'last_name', 'email', 'bio'],
    })
    res.status(200).json(alumniList)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Erreur lors de la récupération des alumni" })
  }
}