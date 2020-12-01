const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Channel extends Model {
    static associate({ User, Post }) {
      this.belongsToMany(User, {
        through: 'users_channels',
      });
      this.hasMany(Post, { foreignKey: 'channelId' });
    }
  }
  Channel.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      parent_id: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      owner_id: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: 'Channel',
      tableName: 'channels',
    }
  );
  return Channel;
};
