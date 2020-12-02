module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tokenSecret: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // username: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      // discogsId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },
      // avatarUrl: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      // wantsUrl: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
      // collectionUrl: {
      //   type: DataTypes.STRING,
      //   allowNull: false,
      // },
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
    await queryInterface.dropTable('users');
  },
};
