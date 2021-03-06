const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate({ User, Channel, Comment, Tag }) {
      this.belongsTo(User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'cascade',
      });
      this.belongsToMany(User, { through: 'users_posts' });
      this.belongsTo(Channel, {
        foreignKey: { name: 'channelId', as: 'posts' },
        onDelete: 'cascade',
        hooks: true,
      });
      this.hasMany(Comment, {
        foreignKey: 'postId',
        as: 'comments',
      });
      this.belongsToMany(Tag, { through: 'posts_tags', as: 'tags' });
    }
  }
  Post.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      postTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
      },
      artist: {
        type: DataTypes.STRING,
      },
      year: {
        type: DataTypes.INTEGER,
      },
      label: {
        type: DataTypes.STRING,
      },
      thumbnail: {
        type: DataTypes.STRING,
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
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
