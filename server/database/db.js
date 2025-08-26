import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

import UserModel from '../models/user.js'
import FormationModel from '../models/formation.js'
import ContactModel from '../models/contact.js'
import AlumniModel from '../models/alumni.js'
import AdminModel from '../models/admin.js'
import AdminActionsHistoryModel from '../models/admin_actions_history.js'

dotenv.config()

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mariadb',
    dialectOptions: {
      ssl: false,
    },
    logging: false,
})

const db = {}

//instance Sequelize
db.sequelize = sequelize
//la classe
db.Sequelize = Sequelize

// Init models
db.User = UserModel(sequelize, Sequelize.DataTypes)
db.Formation = FormationModel(sequelize, Sequelize.DataTypes)
db.Contact = ContactModel(sequelize, Sequelize.DataTypes)
db.Alumni = AlumniModel(sequelize, Sequelize.DataTypes)
db.Admin = AdminModel(sequelize, Sequelize.DataTypes)
db.AdminActionsHistory = AdminActionsHistoryModel(sequelize, Sequelize.DataTypes)

// Relations

// Alumni appartient à User (relation 1:1)
db.Alumni.belongsTo(db.User, { foreignKey: 'user_id', as: 'user' })
db.User.hasOne(db.Alumni, { foreignKey: 'user_id', as: 'alumni' })

// Admin appartient à User (relation 1:1)
db.Admin.belongsTo(db.User, { foreignKey: 'user_id', as: 'user' })
db.User.hasOne(db.Admin, { foreignKey: 'user_id', as: 'admin' })

// Formation appartient à User (1:N)
db.Formation.belongsTo(db.User, { foreignKey: 'users_id', as: 'creator' })
db.User.hasMany(db.Formation, { foreignKey: 'users_id', as: 'formations' })

// Contact appartient à Formation (N:1)
db.Contact.belongsTo(db.Formation, { foreignKey: 'formations_id', as: 'formation' })
db.Formation.hasMany(db.Contact, { foreignKey: 'formations_id', as: 'contacts' })

// AdminActionsHistory appartient à Admin (N:1)
db.AdminActionsHistory.belongsTo(db.Admin, { foreignKey: 'admin_id', as: 'admin' })
db.Admin.hasMany(db.AdminActionsHistory, { foreignKey: 'admin_id', as: 'actions_history' })

export {sequelize}
export default db