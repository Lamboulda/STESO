import bcrypt from 'bcryptjs'
import db from '../database/db.js'
import dotenv from 'dotenv'

dotenv.config()

async function createAdmin() {
  try {
    await db.sequelize.authenticate()
    console.log('Connexion à la base réussie')

    const hashedPassword = await bcrypt.hash('admin1=', 10)

    const newUser = await db.User.create({
      first_name: 'Super',
      last_name: 'Admin',
      email: 'admin@example.com',
      password: hashedPassword,
    })

    await db.Admin.create({
      user_id: newUser.id,
      permissions: 'full-access',
    })

    console.log('✅ Admin créé avec succès')
    process.exit(0)
  } catch (err) {
    console.error('Erreur lors de la création de l\'admin :', err)
    process.exit(1)
  }
}

createAdmin()
