export default(sequelize, DataTypes) =>{
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'users',
    timestamps: false,
  })

  // Hooks pour trim les champs avant création et mise à jour
  User.beforeCreate((user) => {
    if (user.first_name) user.first_name = user.first_name.trim()
    if (user.last_name) user.last_name = user.last_name.trim()
    if (user.email) user.email = user.email.trim().toLowerCase()
    if (user.bio) user.bio = user.bio.trim()
  })

  User.beforeUpdate((user) => {
    if (user.first_name) user.first_name = user.first_name.trim()
    if (user.last_name) user.last_name = user.last_name.trim()
    if (user.email) user.email = user.email.trim().toLowerCase()
    if (user.bio) user.bio = user.bio.trim()
  })

  return User
}