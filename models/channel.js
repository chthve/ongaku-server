const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Channel extends Model {
    static associate({ User, Post }) {
      this.belongsToMany(User, {
        through: 'users_channels',
      });
      this.hasMany(Post, { foreignKey: 'channelId', as: 'posts' });
      this.hasMany(this, {
        as: 'subChannel',
        foreignKey: 'parentId',
        sourceKey: 'id',
        useJunctionTable: false,
      });
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
      ownerId: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      private: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
