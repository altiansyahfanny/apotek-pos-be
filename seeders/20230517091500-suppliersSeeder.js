'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'suppliers',
			[
				{
					id: 1,
					name: 'PT. Angkasa Pura II',
					email: 'email.supplier1@gmail.com',
					phone_number: '6289178664192',
					address: 'Jakarta',
					status: 1,
				},
				{
					id: 2,
					name: 'PT. Jasa Marga',
					email: 'email.supplier2@gmail.com',
					phone_number: '6281388129857',
					address: 'Banjarmasin',
					status: 1,
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('suppliers', null, {});
	},
};
