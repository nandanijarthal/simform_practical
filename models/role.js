module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define("role", {
    name: {
      type: DataTypes.STRING
    }
  }, {
    freezeTableName: true,
    timestamps: true
  });
  Role.associate = (models) => {
    Role.hasMany(models.user, {
      foreignKey: 'id',
    });
  };
  return Role;
};