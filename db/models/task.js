const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Board, Status }) {
      Task.belongsTo(Board, { foreignKey: 'boardId' });
      Task.belongsTo(Status, { foreignKey: 'statusdId' });
    }
  }
  Task.init({
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    boardId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Boards',
        key: 'id',
      },
    },
    statusdId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Statuses',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};
