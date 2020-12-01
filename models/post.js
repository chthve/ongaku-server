const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate({ User, Channel, Comment }) {
      this.belongsTo(User, { foreignKey: 'userId', as: 'user' });
      this.belongsToMany(User, { through: 'users_posts' });
      this.belongsTo(Channel, { foreignKey: 'channelId', as: 'channel' });
      this.hasMany(Comment, { foreignKey: 'postId' });
    }
  }
  Post.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      artist: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      thumbnail: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Post',
      tableName: 'posts',
    }
  );
  return Post;
};
