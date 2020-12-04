const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate({ User, Post }) {
      this.belongsTo(User, { foreignKey: 'userId' });
      this.belongsTo(Post, {
        foreignKey: { name: 'postId', as: 'comments' },
        onDelete: 'cascade',
        hooks: true,
      });
    }
  }
  Comment.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Comment',
      tableName: 'comments',
    }
  );
  return Comment;
};
