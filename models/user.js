const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Post, Channel, Comment }) {
      this.hasMany(Post, { foreignKey: 'userId' });
      this.belongsToMany(Post, { through: 'users_posts', as: 'Saved' });
      this.belongsToMany(Channel, {
        through: 'users_channels',
        as: 'Channels',
      });
      this.hasMany(Comment, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
    }
  );
  return User;
};
