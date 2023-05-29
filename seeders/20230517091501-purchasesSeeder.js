'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		// await queryInterface.bulkInsert(
		// 	'purchases',
		// 	[
		// {
		// 	id: 1,
		// 	invoice_id: 1,
		// 	product_id: 1,
		// 	expired_date: new Date(),
		// 	batch_number: '1a-80-50d',
		// 	total_amount: 10000,
		// 	qty: 1,
		// 	cashback: '',
		// },
		// 	],
		// 	{}
		// );
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('purchases', null, {});
	},
};
