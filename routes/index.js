const product = require('./productRouter');
const productUnit = require('./productUnitRouter');
const productCategory = require('./productCategoryRouter');
const productStatus = require('./productStatusRouter');
const rack = require('./rackRouter');
const alternativePriceCategory = require('./alternativePriceCategoryRouter');
const purchase = require('./purchaseRouter');
const invoice = require('./invoiceRouter');
const supplier = require('./supplierRouter');

module.exports = {
	product,
	rack,
	productUnit,
	productCategory,
	alternativePriceCategory,
	productStatus,
	invoice,
	purchase,
	supplier,
};
