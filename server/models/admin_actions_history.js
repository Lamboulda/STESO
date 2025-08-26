export default (sequelize, DataTypes) => {
  const AdminActionsHistory = sequelize.define('AdminActionsHistory', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    admin_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    action_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    details: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'admin_actions_history',
    timestamps: false,
  })

  return AdminActionsHistory
}