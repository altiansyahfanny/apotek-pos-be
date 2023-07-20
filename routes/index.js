const product = require("./productRouter");
const productUnit = require("./productUnitRouter");
const productCategory = require("./productCategoryRouter");
const productStatus = require("./productStatusRouter");
const rack = require("./rackRouter");
const alternativePriceCategory = require("./alternativePriceCategoryRouter");
const purchase = require("./purchaseRouter");
const invoice = require("./invoiceRouter");
const supplier = require("./supplierRouter");
const warehouse = require("./warehouseRouter");
const customer = require("./customerRouter");
const doctor = require("./doctorRouter");
const sale = require("./saleRouter");
const prescription = require("./prescriptionRouter");
const concoction = require("./concoctionRouter");
const productSales = require("./productSalesRouter");
const auth = require("./authRouter");
const user = require("./userRouter");
const permission = require("./permissionRouter");

module.exports = {
  user,
  auth,
  permission,
  productSales,
  concoction,
  prescription,
  sale,
  doctor,
  product,
  customer,
  rack,
  productUnit,
  productCategory,
  alternativePriceCategory,
  productStatus,
  invoice,
  purchase,
  supplier,
  warehouse,
};
