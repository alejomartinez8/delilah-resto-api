/* eslint-disable no-unused-vars */

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert('Products', [
      {
        name: 'Hot Dog',
        price: 5,
        description: 'Hot Dog Description',
        imageURL:
          'https://www.vvsupremo.com/wp-content/uploads/2016/02/900X570_Mexican-Style-Hot-Dogs.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Hamburguer',
        price: 10,
        description: 'Hamburguer Description',
        imageURL:
          'https://conteudo.imguol.com.br/c/entretenimento/9d/2020/05/26/hamburguer-recheado-na-churrasqueira-1590524861807_v2_450x337.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Pizza',
        price: 8,
        description: 'Pizza Description',
        imageURL: 'https://cdn.colombia.com/sdi/2011/08/25/pizza-margarita-803241.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Products', null, {});
  },
};
