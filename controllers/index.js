const productController = require("./productController");
const productUnitController = require("./productUnitController");
const productCategoryController = require("./productCategoryController");
const productStatusController = require("./productStatusController");
const rackController = require("./rackController");
const alternativePriceCategoryController = require("./alternativePriceCategoryController");
const purchaseContoller = require("./purchaseContoller");
const invoiceContoller = require("./invoiceContoller");
const supplierController = require("./supplierController");
const warehouseController = require("./warehouseController");
const customerController = require("./customerController");
const doctorController = require("./doctorController");
const saleController = require("./saleController");
const prescriptionController = require("./prescriptionController");
const concoctionController = require("./concoctionController");
const productSalesController = require("./productSalesController");
const authController = require("./authController");
const userController = require("./userController");
const permissionController = require("./permissionController");

module.exports = {
  permissionController,
  userController,
  authController,
  prescriptionController,
  concoctionController,
  saleController,
  productController,
  doctorController,
  customerController,
  warehouseController,
  rackController,
  productUnitController,
  productCategoryController,
  alternativePriceCategoryController,
  productStatusController,
  purchaseContoller,
  invoiceContoller,
  supplierController,
  productSalesController,
};
