import { sequelize } from './db.js'

const connectDB = async() =>{
  try {
    await sequelize.authenticate()
    console.log('✅ Connexion à PostGreSQL réussie !')

    await sequelize.sync({ alter: true }) //Créer ou maj les tables
    console.log('🛠️ Tables synchronisées avec Sequelize !')

  } catch (error) {
    console.error('❌ Erreur de connexion à PostGreSQL :', error)
  }
}

export default connectDB