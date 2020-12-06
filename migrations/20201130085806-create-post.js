module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('posts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
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
      thumbnail: {
        type: DataTypes.STRING,
      },
      label: {
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('posts');
  },
};
