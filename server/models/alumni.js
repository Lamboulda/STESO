export default (sequelize, DataTypes) => {
  const Alumni = sequelize.define('Alumni', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    graduation_year: {
      type: DataTypes.INTEGER,
    },
    profession: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'alumni',
    timestamps: false,
  })

  return Alumni
}