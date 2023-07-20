require("dotenv").config();
const express = require("express");
const routes = require("./routes/index");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(logger("dev"));

app.use("/", require("./routes/root"));
app.use("/auth", routes.auth);
app.use("/user", routes.user);
app.use("/product", routes.product);
app.use("/product-unit", routes.productUnit);
app.use("/product-category", routes.productCategory);
app.use("/product-status", routes.productStatus);
app.use("/product-sales", routes.productSales);
app.use("/alternative-price-category", routes.alternativePriceCategory);
app.use("/rack", routes.rack);
app.use("/purchase", routes.purchase);
app.use("/invoice", routes.invoice);
app.use("/supplier", routes.supplier);
app.use("/warehouse", routes.warehouse);
app.use("/customer", routes.customer);
app.use("/doctor", routes.doctor);
app.use("/sale", routes.sale);
app.use("/prescription", routes.prescription);
app.use("/concoction", routes.concoction);
app.use("/permission", routes.permission);

module.exports = app;
