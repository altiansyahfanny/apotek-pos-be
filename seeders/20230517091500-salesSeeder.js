'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		// await queryInterface.bulkInsert(
		// 	'sales',
		// 	[
		// 		{
		// 			id: 1,
		// 			member_code: '1234abcd',
		// 			name: 'Altiansyah Fanny',
		// 			email: 'altiansyah@gmail.com',
		// 			phone_number: '6289178664192',
		// 			address: 'Jakarta',
		// 			status: true,
		// 		},
		// 		{
		// 			id: 2,
		// 			member_code: '4321abcd',
		// 			name: 'Siti Rahmah',
		// 			email: 'sitirahmah@gmail.com',
		// 			phone_number: '6289178664188',
		// 			address: 'Banjarmasin',
		// 			status: true,
		// 		},
		// 	],
		// 	{}
		// );
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('sales', null, {});
	},
};
