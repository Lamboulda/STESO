export default (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('first_name', value.trim())
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('last_name', value.trim())
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('email', value.trim().toLowerCase())
      }
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      set(value) {
        this.setDataValue('message', value.trim())
      }
    },
    created_at: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'form',
    timestamps: true,
  })

  return Contact
}