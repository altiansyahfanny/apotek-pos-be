const productController = require('./productController');
const productUnitController = require('./productUnitController');
const productCategoryController = require('./productCategoryController');
const productStatusController = require('./productStatusController');
const rackController = require('./rackController');
const alternativePriceCategoryController = require('./alternativePriceCategoryController');
const purchaseContoller = require('./purchaseContoller');
const invoiceContoller = require('./invoiceContoller');
const supplierController = require('./supplierController');

module.exports = {
	productController,
	rackController,
	productUnitController,
	productCategoryController,
	alternativePriceCategoryController,
	productStatusController,
	purchaseContoller,
	invoiceContoller,
	supplierController,
};
