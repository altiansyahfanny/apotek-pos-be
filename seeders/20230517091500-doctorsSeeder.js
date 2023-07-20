'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'doctors',
			[
				{
					id: 1,
					specialization: 'Penyakit Dalam',
					name: 'Alika Nursavinna',
					sip: '113-900-507',
					email: 'alika@gmail.com',
					phone_number: '6281289238128',
					address: 'Banjarmasin',
					status: true,
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('doctors', null, {});
	},
};
