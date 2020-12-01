module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable(
      'Tags',
      {
        id: {
          allowNull: false,
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
        },
        name: {
          type: DataTypes.STRING,
        },
      },
      { timestamps: false }
    );
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Tags');
  },
};
