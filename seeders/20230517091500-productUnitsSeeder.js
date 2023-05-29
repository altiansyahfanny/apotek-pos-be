'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			'product_units',
			[
				{ id: 1, name: 'Ampul' },
				{ id: 2, name: 'Batang' },
				{ id: 3, name: 'Biji' },
				{ id: 4, name: 'Botol' },
				{ id: 5, name: 'Box' },
				{ id: 6, name: 'Buah' },
				{ id: 7, name: 'Bungkus' },
				{ id: 8, name: 'Butir' },
				{ id: 9, name: 'CC' },
				{ id: 10, name: 'Cm' },
				{ id: 11, name: 'Dosin' },
				{ id: 12, name: 'Dus' },
				{ id: 13, name: 'Flakon' },
				{ id: 14, name: 'Galon' },
				{ id: 15, name: 'Gram' },
				{ id: 16, name: 'Ikat' },
				{ id: 17, name: 'Iris' },
				{ id: 18, name: 'Kaleng' },
				{ id: 19, name: 'Kapsul' },
				{ id: 20, name: 'Karton' },
				{ id: 21, name: 'Karung' },
				{ id: 22, name: 'Kg' },
				{ id: 23, name: 'Kotak' },
				{ id: 24, name: 'Lembar' },
				{ id: 25, name: 'Liter' },
				{ id: 26, name: 'Miligram' },
				{ id: 27, name: 'Mililiter' },
				{ id: 28, name: 'Mililmeter' },
				{ id: 29, name: 'Pasien' },
				{ id: 30, name: 'Pcs' },
				{ id: 31, name: 'Plabot' },
				{ id: 32, name: 'Plabot' },
				{ id: 33, name: 'Pot' },
				{ id: 34, name: 'Pound' },
				{ id: 35, name: 'Sachet' },
				{ id: 36, name: 'Satuan' },
				{ id: 37, name: 'Sloki' },
				{ id: 38, name: 'Strip' },
				{ id: 39, name: 'Supp' },
				{ id: 40, name: 'Tablet' },
				{ id: 41, name: 'Tube' },
				{ id: 42, name: 'Unit' },
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('product_units', null, {});
	},
};
