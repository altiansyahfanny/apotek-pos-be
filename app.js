const express = require('express');
const routes = require('./routes/index');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(logger('dev'));

app.use('/v1/', require('./routes/root'));
app.use('/v1/product', routes.product);
app.use('/v1/product-unit', routes.productUnit);
app.use('/v1/product-category', routes.productCategory);
app.use('/v1/product-status', routes.productStatus);
app.use('/v1/alternative-price-category', routes.alternativePriceCategory);
app.use('/v1/rack', routes.rack);
app.use('/v1/purchase', routes.purchase);
app.use('/v1/invoice', routes.invoice);
app.use('/v1/supplier', routes.supplier);

module.exports = app;
