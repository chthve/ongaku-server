const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate({ Post }) {
      this.belongsToMany(Post, { through: 'posts_tags' });
    }
  }
  Tag.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Tag',
      tableName: 'tags',
    }
  );
  return Tag;
};
