import db from '../database/db.js'

export const getAdminActions = async (req, res) => {
  try {
    const actions = await db.AdminActionsHistory.findAll({
      include: [
        {
          model: db.Admin,
          as: 'admin',
          include: [
            {
              model: db.User,
              as: 'user',
              attributes: ['first_name', 'last_name', 'email'],
            },
          ],
        },
      ],
      order: [['action_date', 'DESC']],
    })

    res.status(200).json(actions)
  } catch (err) {
    console.error('Erreur lors de la récupération des actions admin :', err)
    res.status(500).json({ error: 'Erreur serveur' })
  }
}