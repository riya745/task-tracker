module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("tasks", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    due_date: { type: DataTypes.DATE },
    status: { type: DataTypes.STRING },
    user_id: { type: DataTypes.INTEGER, allowNull: false }
  });
  return Task;
};
