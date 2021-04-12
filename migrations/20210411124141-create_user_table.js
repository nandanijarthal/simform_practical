'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('user', {
              id: {
                  allowNull: false,
                  autoIncrement: true,
                  primaryKey: true,
                  type: Sequelize.INTEGER
              },
              first_name: {
                  type: Sequelize.STRING,
              },
              last_name: {
                  type: Sequelize.STRING,
              },
              email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
              },
              mobile: {
                  type: Sequelize.STRING,
                  allowNull: false,
                  unique: true
              },
              password: {
                type: Sequelize.STRING,
                allowNull: false
              },
              office_address: {
                type: Sequelize.STRING
              },
              home_address: {
                type: Sequelize.STRING
              },
              image: {
                type: Sequelize.STRING,
              },
              role_id: {
                  type: Sequelize.INTEGER,
                  allowNull: false,
              },
              created_by: {
                  type: Sequelize.INTEGER,
              },
              createdAt: {
                  allowNull: false,
                  type: Sequelize.DATE
              },
              updatedAt: {
                  allowNull: false,
                  type: Sequelize.DATE,
              },
              deletedAt: {
                  allowNull: true,
                  type: Sequelize.DATE
              }
          },
          {
              indexes: [
                  {
                      unique: true,
                      fields: ['email', 'role_id']
                  }
              ]
          });
  },
  down: (queryInterface) => queryInterface.dropTable('user')
};
