import bcrypt from 'bcryptjs'

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10)
  const hashed = await bcrypt.hash(password, salt)
  console.log("Mot de passe hashé :", hashed)
}

const passwordToHash = 'user1'
hashPassword(passwordToHash)
