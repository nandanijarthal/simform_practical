module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
        first_name: {
            type: DataTypes.STRING
        },
        last_name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        mobile: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING
        },
        office_address: {
            type: DataTypes.STRING
        },
        home_address: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.STRING
        },
        role_id: {
            type: DataTypes.INTEGER
        },
        created_by: {
            type: DataTypes.INTEGER
        }
    }, {
        freezeTableName: true,
        paranoid: true,
        timestamps: true
    });

    User.associate = function (models) {
        User.belongsTo(models.role, {
            foreignKey: 'role_id',
            as: 'role'
        });
    };
    return User;
};